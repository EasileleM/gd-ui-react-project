import { Feedback } from "../db/Models/feedback.model";

class FeedbackService {
  addFeedback(data) {
    const newFeedback = new Feedback(data);
    return newFeedback.save();
  }
}

const FeedbackServiceInstance = new FeedbackService();

export default FeedbackServiceInstance;