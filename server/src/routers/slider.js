import express from 'express';
import SliderService from '../services/SliderService';

export const sliderRouter = express.Router();

sliderRouter.get('/', (req, res) => {
  try {
    const slides = await SliderService.getSliders(req.query.amount);
    res.status(200).send(slides);
  }
  catch (err) {
    res.status(500).send(err);
  }
});
