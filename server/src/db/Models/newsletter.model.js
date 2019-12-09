import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema({
  email: String,
}, {collection : 'newsletter'});

export const Newsletter = mongoose.models.Newsletter || mongoose.model('Newsletter', newsletterSchema);