import express from 'express';
import NewsletterService from "../services/NewsletterService";

export const newsletterRouter = express.Router();

newsletterRouter.post('/', (req, res) => {
  try {
    const service = new NewsletterService();
    //TODO add email validation
    service
      .addSignee(req.body)
      .then((result) => {
        res.status(201).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
  catch (err) {
    res.statis(500).send(err);
  }
});
