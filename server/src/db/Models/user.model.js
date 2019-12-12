import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

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
}, {collection: 'users'});

export const User = mongoose.models.User || mongoose.model('User', userSchema);