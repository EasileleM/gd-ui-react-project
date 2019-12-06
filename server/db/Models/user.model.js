const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  cart: [
    {
      itemId: mongoose.Types.ObjectId,
      size: String,
      color: String,
      amount: Number
    }
  ]
}, {collection: 'users'});

// userSchema.set('toJSON', {
//   transform: function (doc, ret, options) {
//     ret.info = {
//       _id: ret._id,
//       email: ret.email,
//       firstName: ret.firstName,
//       lastName: ret.lastName,
//     };
//     delete ret._id;
//     delete ret.__v;
//     delete ret.password;
//     delete ret.email;
//     delete ret.firstName;
//     delete ret.lastName;
//   }
// });

module.exports = mongoose.models.User || mongoose.model('User', userSchema);