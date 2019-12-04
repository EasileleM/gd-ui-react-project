const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./db/Models/user.model');

function initialize(passport) {
  const authenticateUser =  function (email, password, done) {
    User.findOne({'email': email}, async function (err, user) {
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
  passport.serializeUser((user, done) => {
    console.log("serializeUser:");
    return done(null, user)
  });
  passport.deserializeUser((id, done) => {
    return done(null, id)//todo переделоть
  })
}

module.exports = initialize;