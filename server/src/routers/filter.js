import express from 'express';
import FilterService from '../services/FilterService';
export const filterRouter = express.Router();

filterRouter.get('/', async (req, res) => {
  try {
    FilterService.setLang(req.query.lang);
    const item = await FilterService.getFilterFields();
    const itemCopy = {};
    for (const field in item) {
      if (item.hasOwnProperty(field) && field != '_id') {
        itemCopy[field] = item[field];
      }
    }
    res.status(200).send(itemCopy);
  } catch (err) {
    console.trace(err);
    res.status(500).send();
  };
});
