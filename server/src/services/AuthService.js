import passport from "passport";
import {User} from "../db/Models/user.model";
import {LANGS, PASSWORD_REGEX} from "../constants/constants";
import ItemsServiceInstance from "./ItemsService";
import UserServiceInstance from "./UserService";

class AuthService {
  async signUp(req, res) {
    const userInDb = await User.findOne({'email': req.body.email}).exec();

    if (userInDb) {
      res.status(409).send("User already exists.");
      return;
    }

    const hashedPassword = await UserServiceInstance.hashPassword(req.body.password);

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
      currentErrors.push({properties: {message: 'Invalid email/password'}});
    }

    try {
      await newUser.save();
    } catch (err) {
      const errorMessages = new Set([...Object.values(err.errors), ...currentErrors]);
      res.status(403).send([...errorMessages].map((item) => item.properties.message));
      return;
    }

    if (currentErrors.length) {
      res.status(403).send(currentErrors);
      return;
    }

    this.authenticate(req, res);
  }

  async getAnonCartWithItems(cart, lang = LANGS.ENG) {
    return await cart.map(async (item) => {
      return {
        color: item.color,
        amount: item.amount,
        size: item.size,
        generalData :await ItemsServiceInstance.getById(item.itemId),
      }
    });
  }

  async getAnonFavoritesWithItems(favorites, lang = LANGS.ENG) {
    const favoritesItems = await ItemsServiceInstance.getByIdArray(favorites, lang);
    return favoritesItems.items;
  }

  authenticate(req, res) {
    passport.authenticate('local', (err, user) => {
      if (err) {
        console.trace(err);
        return res.status(500).send();
      }
      if (!user) {
        return res.status(403).send('Wrong password/email.');
      }
      req.logIn(user, async (err) => {
        if (err) {
          console.trace(err);
          res.status(500).send();
        }
        try {
          const {cart: userCart, favorites: userFavorites} = await User.findOne({'email': req.user.email});
          const anonCart = req.session.cart;
          const mergedCart = this.mergeCarts(anonCart, userCart);
          req.session.favoritesItems = req.session.favoritesItems ? req.session.favoritesItems : [];
          const mergedFavorites = Array.from(new Set([...req.session.favoritesItems, ...userFavorites]));

          await UserServiceInstance.setCart(req.user.email, mergedCart);
          await UserServiceInstance.setFavorites(mergedFavorites);
        }
        catch (e) {
          console.trace(e);
          res.status(500).send();
        }

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
      if (collisionedItemIndex !== -1) {
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