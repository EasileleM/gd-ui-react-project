import express from 'express';
import NewsletterService from '../services/NewsletterService';

export const newsletterRouter = express.Router();

newsletterRouter.post('/', async (req, res) => {
  try {
    const service = new NewsletterService();
    //TODO add email validation
    const result = await service.addSignee(req.body);
    res.status(201).send(result);
  }
  catch (err) {
    res.statis(500).send(err);
  }
});

