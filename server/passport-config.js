import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import passportAnonymUuid from 'passport-anonym-uuid';
import {User} from "./db/Models/user.model"

const LocalStrategy = passportLocal.Strategy;
const AnonymIdStrategy = passportAnonymUuid.Strategy;

function initialize(passport) {
  const authenticateUser =  function (email, password, done) {
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
      return done(null, user);
    });
  };

  passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser));

  passport.use(new AnonymIdStrategy());

  passport.serializeUser((user, done) => {
    return done(null, user._id)
  });
  passport.deserializeUser(async (id, done) => {
    return done(null, await User.findOne({_id: id}))
  })
}

export default initialize;