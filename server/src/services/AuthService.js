import passport from "passport";
import {User} from "../db/Models/user.model";
import bcrypt from "bcrypt";
import {Items} from "../db/Models/item.model";


class AuthService {
  async signUp(req, res) {
    console.log(req.body);
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const userInDb = await User.findOne({'email': req.body.email}).exec();

    if (userInDb) {
      res.status(409).send("User already exists");
      return;
    }
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      cart: []
    });
    await newUser.save();

    req.session.destroy();
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

  authenticate(req, res) {
    passport.authenticate('local',  (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      if (!user) {
        return res.status(400).send('wrong password or email'); // TODO more informative error message
      }
      req.logIn(user, async (err) =>  {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }

        const {cart: userCart} = await User.findOne({'email': req.user.email});
        const anonCart = req.session.cart;
        const mergedCart = this.mergeCarts(anonCart, userCart);

        await User
            .updateOne(
                {'email': req.user.email},
                {$set: {cart: mergedCart}},
                {upsert: true}
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
      if (~collisionedItemIndex) {
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