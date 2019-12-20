import express from 'express';
import NewsletterServiceInstance from '../services/NewsletterService';
import { EMAIL_REGEX } from "../constants/constants";

export const newsletterRouter = express.Router();

newsletterRouter.post('/', async (req, res) => {
  try {
    const email = req.body.email;
    if (!EMAIL_REGEX.test(email)) {
      res.status(404).send("Email is not valid");
      return;
    }
    const result = await NewsletterServiceInstance.addSignee(req.body.email);
    res.status(201).send(result);
  }
  catch (err) {
    console.trace(err);
    res.status(500).send(err);
  }
});

