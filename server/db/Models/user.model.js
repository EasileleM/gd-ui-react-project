const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String,
}, {collection : 'users'});

userSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.__v;
    delete ret.password
  }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;