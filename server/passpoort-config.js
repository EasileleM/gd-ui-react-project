const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./db/Models/user.model');

function initialize(passport) {
  const authenticateUser = function (email, password, done) {
    console.log("got there")
    User.findOne({'email': email}, function (err, user) {
      if (err) {
        console.log(`Error: ${err}`);
        return done(err);
      }
      if (!user) {
        console.log(`user wasn't found`);
        return done(null, false);
      }
      console.log(user, password)
      if (user.password !== password) {
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