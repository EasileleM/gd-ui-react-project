import mongoose, {ObjectId} from 'mongoose';

const userSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  cart: [
    {
      itemId: ObjectId,
      size: String,
      color: String,
      amount: Number
    }
  ]
}, {collection : 'users'});

userSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.__v;
    delete ret.password
  }
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);