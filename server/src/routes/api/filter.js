import express from 'express';
import FilterService from '../../services/FilterService';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    FilterService.setLang(req.query.lang);
    await FilterService
        .getFilterFields()
        .then(item => {
              res.status(200);
              const newItem = {};
              for (const key in item) {
                if (item.hasOwnProperty(key) && key !== '_id') {
                  newItem[key] = item[key];
                }
              }
              res.send(JSON.stringify(newItem));
            }
        )
  } catch (err) {
    res.status(500);
    res.send(JSON.stringify(err));
  }
});

export default router;