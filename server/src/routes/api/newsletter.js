import express from 'express';
import NewsletterService from '../../services/NewsletterService';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const service = new NewsletterService();
    //todo add email validation
    await service.addSignee(req.body).then((result) => {
      res.status(201);
      res.send(JSON.stringify(result))
    }
    )
  } catch (err) {
    res.statis(500);
    res.send(JSON.stringify(err));
  }
});

export default router;