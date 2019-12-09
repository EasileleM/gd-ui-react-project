import mongoose from 'mongoose';

const sliderSchema = new mongoose.Schema({
  sliderImg: String,
  itemId: String
}, {collection : 'slider'});

export const Slider = mongoose.models.Slider || mongoose.model('Slider', sliderSchema);