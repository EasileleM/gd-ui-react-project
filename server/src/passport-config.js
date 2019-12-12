import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';

import { User } from "./db/Models/user.model"
import { Items } from "./db/Models/item.model";

const LocalStrategy = passportLocal.Strategy;

export function passportInit(passport) {
  const authenticateUser = function (email, password, done) {
    User.findOne({ 'email': email }, async function (err, user) {
      if (err) {
        console.trace(err);
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Wrong password/email.' });
      }
      const isPasswordRight = await bcrypt.compare(password, user.password);
      if (!isPasswordRight) {
        return done(null, false, { message: 'Wrong password/email.' });
      }
      return done(null, user);
    });
  };

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

  passport.serializeUser((user, done) => {
    return done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findOne({ _id: id }).lean();
    const preparedUser = {
      info: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    };

    const cartDataPromises = user.cart.map((item) => {

      return Items
        .findById(item.itemId)
        .lean()
        .exec()
        .then((generalData) => { //TODO translation
          generalData.description = generalData.description["en"];
          generalData.name = generalData.name["en"];
          return {
            color: item.color,
            amount: item.amount,
            size: item.size,
            generalData
          }
        });
    });
    preparedUser.cartItems = await Promise.all(cartDataPromises);
    return done(null, preparedUser);
  })
}
