const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String,
}, {collection : 'users'});

const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;