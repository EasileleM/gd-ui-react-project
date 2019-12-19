import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  email: String,
  feedback: String,
  name: String
}, { collection: 'feedback' });

export const Feedback = mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);