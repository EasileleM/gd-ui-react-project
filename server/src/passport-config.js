import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import {User} from "./db/Models/user.model"
import {Items} from "./db/Models/item.model";

const LocalStrategy = passportLocal.Strategy;

function passportInit(passport) {
  const authenticateUser = function (email, password, done) {
    User.findOne({'email': email}, async function (err, user) {
      console.log(user);
      if (err) {
        console.log(`Error: ${err}`);
        return done(err);
      }
      if (!user) {
        console.log(`user wasn't found`);
        return done(null, false);
      }
      const isPasswordRight = await bcrypt.compare(password, user.password);
      if (!isPasswordRight) {
        console.log(`wrong password`);
        return done(null, false);
      }
      console.log("user was found successfully");
      return done(null, user);
    });
  };

  passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser));

  passport.serializeUser((user, done) => {
    return done(null, user._id)
  });
  passport.deserializeUser(async (id, done) => {
    const user = await User.findOne({_id: id}).lean();

    user.info = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    delete user._id;
    delete user.__v;
    delete user.password;
    delete user.email;
    delete user.firstName;
    delete user.lastName;


    const cartDataPromises = user.cart.map((item) => {

      return Items
          .findById(item.itemId)
          .lean()
          .exec()
          .then((generalData) => {
            generalData.description = generalData.description["en"];
            generalData.name = generalData.name["en"];


            return {
              color: item.color,
              amount: item.amount,
              size: item.size,
              generalData
            }
          })
    });
    user.cartItems = await Promise.all(cartDataPromises);
    delete user.cart;
    return done(null, user);
  })
}

export default passportInit;