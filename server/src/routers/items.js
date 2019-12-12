import express from 'express';
import ItemsService from '../services/ItemsService';

export const itemsRouter = express.Router();

itemsRouter.get('/', async (req, res) => {
  try {
    if (!req.query.id) {
      res.status(400).send();
      return;
    }
    const idArray = req.query.id.split(',');
    const { items, rejectedId } = await ItemsService.getByIdArray(idArray, req.query.lang);
    res.status(200).send({ items, rejectedId });
  }
  catch (err) {
    console.trace(err);
    res.status(500).send();
  }
});

itemsRouter.get('/all', async (req, res) => {
  try {
    const items = await ItemsService.search(req.query, req.query.lang);
    const result = ItemsService.pagination(ItemsService.filter(items, req.query), req.query.size, req.query.page);
    res.status(200).send(result);
  }
  catch (err) {
    console.trace(err);
    res.status(500).send();
  }
});

itemsRouter.get('/recent', async (req, res) => {
  try {
    const items = await ItemsService.getRecentItems(req.query.size, req.query.page, req.query.lang);
    res.status(200).send(items);
  }
  catch (err) {
    console.trace(err);
    res.status(500).send();
  }
});

itemsRouter.get('/related', async (req, res) => {
  try {
    if (!req.query.id) {
      res.status(400).send();
      return;
    }
    const items = await ItemsService.getRelatedItems(req.query.id, req.query.size, req.query.page, req.query.lang)
    res.status(200).send(items);
  }
  catch (err) {
    if (err.message === 404) {
      res.status(404).send();
      return;
    }
    console.trace(err);
    res.status(500).send();
  }
});

itemsRouter.get('/sales', async (req, res) => {
  try {
    const items = await ItemsService.getSalesItems(req.query.size, req.query.page, req.query.lang);
    res.status(200).send(items);
  }
  catch (err) {
    console.trace(err);
    res.status(500).send();
  }
});

itemsRouter.get('/:id', async (req, res) => {
  try {
    const result = await ItemsService.getById(req.params.id, req.query.lang);
    if (!result) {
      res.status(404).send();
    }
    else {
      res.status(200).send(result);
    }
  }
  catch (err) {
    console.trace(err);
    res.status(500).send();
  }
});