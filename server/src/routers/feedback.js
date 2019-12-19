import express from 'express';
import FeedbackServiceInstance from '../services/FeedbackService';
import { EMAIL_REGEX } from "../constants/constants";

export const feedbackRouter = express.Router();

feedbackRouter.post('/', async (req, res) => {
  try {
    const email = req.body.email;
    if (!EMAIL_REGEX.test(email)) {
      res.status(404).send("Email is not valid");
      return;
    }
    const result = await FeedbackServiceInstance.addFeedback(req.body);
    res.status(201).send(result);
  }
  catch (err) {
    console.trace(err);
    res.status(500).send(err);
  }
});

