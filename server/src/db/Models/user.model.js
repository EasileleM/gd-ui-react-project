import mongoose from 'mongoose';

import {EMAIL_REGEX, FIRST_NAME_REGEX, LAST_NAME_REGEX} from "../../constants/constants";

const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  cart: [
    {
      itemId: {type: ObjectId, required: true},
      size: { type: String, required: true },
      color: { type: String, required: true },
      amount: { type: Number, required: true },
    }
  ],
  favorites: [ObjectId]
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