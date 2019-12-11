import express from 'express';
import ItemsService from '../services/ItemsService';
import SliderService from '../services/SliderService';

export const sliderRouter = express.Router();

sliderRouter.get('/', async (req, res) => {
  try {
    ItemsService.setLang(req.query.lang);
    const slides = await SliderService.getSliders(req.query.amount);
    res.status(200).send(slides);
  }
  catch (err) {
    console.trace(err);
    res.status(500).send(err);
  }
});
