import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';

import { User } from "./db/Models/user.model"

const LocalStrategy = passportLocal.Strategy;

export function passportInit(passport) {
  const authenticateUser = function (email, password, done) {
    User.findOne({ 'email': email }, async function (err, user) {//todo maybe use similar function from UserService
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
    return done(null, user);
  })
}
