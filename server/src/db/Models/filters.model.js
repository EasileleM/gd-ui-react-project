import mongoose from 'mongoose';

const filtersSchema = new mongoose.Schema({
  categories: {
    en: [String],
    ru: [String]
  },
  maxprice: String,
  minPrice: String,
  sizes: [Number],
  colors: [Number],
  brands: [String],
}, { collection: 'filters' });

export const Filters = mongoose.models.Filters || mongoose.model('Filters', filtersSchema);