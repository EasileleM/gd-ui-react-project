import express from 'express';
import ItemsService from '../services/ItemsService';

export const itemsRouter = express.Router();

itemsRouter.get('/', async (req, res) => {
  try {
    if (!req.query.id) {
      res.status(400).send('NO ID PROVIDED');
      return;
    }

    ItemsService.setLang(req.query.lang);
    const idArray = req.query.id.split(',');
    const items = ItemsService.getByIdArray(idArray);
    const rejectedId = [];
    if (idArray && idArray.length > items.length) {
      for (const id of idArray) {
        if (!items.some((item) => item._id === id)) {
          rejectedId.push(id);
        }
      }
    }
    res.status(200).send({ items, rejectedId });
  }
  catch (err) {
    res.status(500).send(err);
  }
});

itemsRouter.get('/all', async (req, res) => {
  try {
    ItemsService.setLang(req.query.lang);
    const items = await ItemsService.search(req.query);
    const result = ItemsService.pagination(ItemsService
      .filter(items, req.query), req.query.size, req.query.page);
    res.status(200).send(result);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

itemsRouter.get('/filter', async (req, res) => {
  try {
    ItemsService.setLang(req.query.lang);
    const items = await ItemsService.filter(req.query);
    const result = ItemsService.pagination(items, req.query.size, req.query.page);
    res.status(200).send(result);
  }
  catch (err) {
    res.status(500).send(err);
  }
});

router.get('/filter', async (req, res) => {
  try {
    ItemsService.setLang(req.query.lang);
    const items = await ItemsService.filter(req.query);
    const result = ItemsService.pagination(items, req.query.size, req.query.page);
    res.status(200);
    res.send(JSON.stringify(result))
  } catch (err) {
    res.status(500);
    res.send(JSON.stringify(err));
  }
});

itemsRouter.get('/recent', async (req, res) => {
  try {
    ItemsService.setLang(req.query.lang);
    const items = await ItemsService.getRecentItems(req.query.size, req.query.page);
    res.status(200).send(items);
  }
  catch (err) {
    res.status(500).send(err);
  }
});

itemsRouter.get('/related', async (req, res) => {
  try {
    if (!req.query.id) {
      res.status(400).send('NO ID PROVIDED');
      return;
    }
    ItemsService.setLang(req.query.lang);
    const items = await ItemsService.getRelatedItems(req.query.id, req.query.size, req.query.page)
    res.status(200).send(items);
  }
  catch (err) {
    if (err.message === 'NOT FOUND') { // TODO excuse me, wtf?
      res.status(404).send(`NOT FOUND ${req.query.id}`);
      return;
    }
    if (err.message === 'BAD ID') {
      res.status(400).send(`BAD ID ${req.query.id}`);
      return;
    }
    res.status(500).send(err);
  }
});

itemsRouter.get('/sales', async (req, res) => {
  try {
    ItemsService.setLang(req.query.lang);
    const items = await ItemsService.getSalesItems(req.query.size, req.query.page);
    res.status(200).send(items);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

itemsRouter.get('/:id', async (req, res) => {
  try {
    ItemsService.setLang(req.query.lang);
    const result = await ItemsService.getById(req.params.id);
    if (!result) {
      res.status(404).send(`NOT FOUND ${req.params.id}`);
    } else {
      res.status(200).send(result);
    }
  }
  catch (err) {
    if (err.message === 'BAD ID') { // TODO ???
      res.status(400).send(`BAD ID ${req.params.id}`);
      return;
    }
    res.status(500).send(err);
  }
});
