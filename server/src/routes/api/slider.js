import express from 'express';
import SliderService from "../../services/SliderService";

const router = express.Router();

router.get('/', (req, res) => {
  try {
    SliderService.getSliders(req.query.amount)
        .then(slides => {
              res.status(200);
              res.send(JSON.stringify(slides))
            }
        )
        .catch(err => {
              res.status(500);
              res.send(JSON.stringify(err));
            }
        )
  } catch (err) {
    res.status(500);
    res.send(JSON.stringify(err));
  }
});

export default router