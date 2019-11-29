const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User  = require('./db/Models/user.model');

async function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    let user = await User.findOne({email});
    console.log(user);
    if (!user) {
      return done(null, false, {message: 'No user with that email'})
    }
    try {
      console.log(user.password);
      if (password === user.password) {
        console.log("authorized");
        return done(null, user)
      } else {
        return done(null, false, {message: 'Password incorrect'})
      }
    } catch (e) {
      return done(e)
    }
  };

  passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    return done(null, await User.findById(id))
  })
}

module.exports = initialize;