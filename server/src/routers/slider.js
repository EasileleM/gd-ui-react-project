import express from 'express';
import SliderService from "../services/SliderService";

export const sliderRouter = express.Router();

sliderRouter.get('/', (req, res) => {
  try {
    SliderService.getSliders(req.query.amount)
      .then((slides) => {
        res.status(200).send(slides)
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
  catch (err) {
    res.status(500).send(err);
  }
});
