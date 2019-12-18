import mongoose from 'mongoose';

const itemsSchema = new mongoose.Schema({
  name: {
    en: String,
    ru: String
  },
  bundleInfo: String,
  description: {
    en: String,
    ru: String
  },
  price: Number,
  sizes: [Number],
  colors: [Number],
  images: [{
    src: String,
    srcset: [String]
  }],
  sale: String,
  rating: String,
  categories: [String],
  brand: String,
  creationDate: Date
}, { collection: 'items' });

export const Items = mongoose.models.Items || mongoose.model('Items', itemsSchema);