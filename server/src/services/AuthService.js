import passport from "passport";
import { User } from "../db/Models/user.model";
import bcrypt from "bcrypt";
import { Items } from "../db/Models/item.model";
import { PASSWORD_REGEX } from "../constants/constants";

class AuthService {
  async signUp(req, res) {
    const userInDb = await User.findOne({ 'email': req.body.email }).exec();

    if (userInDb) {
      res.status(409).send("User already exists.");
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      cart: [],
      favorites: [],
    });

    const currentErrors = [];

    if (!PASSWORD_REGEX.test(req.body.password)) {
      currentErrors.push({ properties: { message: 'Invalid email/password' } });
    }

    try {
      await newUser.save();
    }
    catch (err) {
      const errorMessages = new Set([...Object.values(err.errors), ...currentErrors]);
      res.status(400).send([...errorMessages].map((item) => item.properties.message));
      return;
    }

    if (currentErrors.length) {
      res.status(400).send(currentErrors);
      return;
    }

    this.authenticate(req, res);
  }

  async getAnonCartWithItems(cart) {
    const cartDataPromises = cart.map((item) => {
      return Items
        .findById(item.itemId)
        .lean()
        .exec()
        .then((generalData) => {
          generalData.description = generalData.description['en']; // TODO translation
          generalData.name = generalData.name['en'];
          return {
            color: item.color,
            amount: item.amount,
            size: item.size,
            generalData
          }
        });
    });

    return Promise.all(cartDataPromises);
  }

  async getAnonFavoritesWithItems(favorites) {
    return Items.find({ '_id': { $in: favorites } })
      .lean()
      .exec()
      .then((items) => {
        return items.map((item) => {
          item.description = item.description['en'];
          item.name = item.name['en'];
          return item;
        })
      });
  }

  authenticate(req, res) {
    passport.authenticate('local', (err, user) => {
      if (err) {
        console.trace(err);
        return res.status(500).send();
      }
      if (!user) {
        return res.status(400).send('Wrong password/email.');
      }
      req.logIn(user, async (err) => {
        if (err) {
          console.trace(err);
          res.status(500).send();
        }

        const { cart: userCart, favorites: userFavorites } = await User.findOne({ 'email': req.user.email });
        const anonCart = req.session.cart;
        const mergedCart = this.mergeCarts(anonCart, userCart);
        req.session.favoritesItems = req.session.favoritesItems ? req.session.favoritesItems : [];
        const mergedFavorites = new Set([...req.session.favoritesItems, ...userFavorites]);

        await User
          .updateOne(
            { 'email': req.user.email },
            { $set: { cart: mergedCart, favorites: Array.from(mergedFavorites) } },
            { upsert: true }
          )
          .exec();
        return res.redirect('/api/auth/');
      });
    })(req, res);
  }

  /**
   * mergeCarts - merges two carts
   * when it face with item collisions (same id, color and size)
   * it sum up it's amount
   * @example
   * mergeCarts([{itemId: 1, color: 1, size: 1, amount: 1}
   * , {itemId: 2, color: 1, size: 1, amount: 1}],
   * [{itemId: 1, color: 1, size: 1, amount: 1}
   * , {itemId: 2, color: 1, size: 1, amount: 1}
   * , {itemId: 3, color: 1, size: 1, amount: 3}]);
   * //output - [{itemId: 1, color: 1, size: 1, amount: 2}
   * //, {itemId: 2, color: 1, size: 1, amount: 2}
   * //, {itemId: 3, color: 1, size: 1, amount: 3}]
   * @param {Object[]} firstCart
   * @param {Object[]} secondCart
   * @returns {Object[]}
   */

  mergeCarts(firstCart, secondCart) {
    if (!firstCart && !secondCart) {
      return [];
    }
    if (!firstCart) {
      return secondCart;
    }
    if (!secondCart) {
      return firstCart;
    }
    const result = [...firstCart];
    for (const targetItem of secondCart) {
      const collisionedItemIndex = result.findIndex((item) => {
        return item.itemId.toString() === targetItem.itemId.toString()
          && item.color === targetItem.color
          && item.size === targetItem.size
      });
      if (collisionedItemIndex === -1) {
        result[collisionedItemIndex].amount += targetItem.amount;
      } else {
        result.push(targetItem);
      }
    }
    return result;
  }
}

const AuthServiceInstance = new AuthService();

export default AuthServiceInstance;