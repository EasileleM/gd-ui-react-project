import mongoose from 'mongoose';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const FIRST_NAME_REGEX = /^[a-zA-Z]{1,}$/;
const LAST_NAME_REGEX = /^[a-zA-Z]{1,}$/;

const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  cart: [
    {
      itemId: ObjectId,
      size: { type: String, required: true },
      color: { type: String, required: true },
      amount: { type: Number, required: true },
    }
  ]
}, { collection: 'users' });

userSchema.path('email').validate(function (value) {
  return EMAIL_REGEX.test(value);
}, 'Invalid email/password');

userSchema.path('firstName').validate(function (value) {
  return FIRST_NAME_REGEX.test(value);
}, 'Invalid first name');

userSchema.path('lastName').validate(function (value) {
  return LAST_NAME_REGEX.test(value);
}, 'Invalid last name');

export const User = mongoose.models.User || mongoose.model('User', userSchema);