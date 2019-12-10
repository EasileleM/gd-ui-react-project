import express from 'express';
import ItemsService from "../services/ItemsService";

export const itemsRouter = express.Router();

itemsRouter.get('/', (req, res) => {
  try {
    if (!req.query.id) {
      res.status(400).send("NO ID PROVIDED");
      return;
    }

    ItemsService.setLang(req.query.lang);
    const idArray = req.query.id.split(',');

    return ItemsService
      .getByIdArray(idArray)
      .then(items => {
        const rejectedId = [];
        if (idArray && idArray.length > items.length) {
          for (const id of idArray) {
            if (!items.some((item) => item._id === id)) {
              rejectedId.push(id);
            }
          }
        }
        res.status(200).send({ items, rejectedId });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
  catch (err) {
    res.status(500).send(err);
  }
});

itemsRouter.get('/all', (req, res) => {
  try {
    ItemsService.setLang(req.query.lang);
    ItemsService.search(req.query)
      .then((items) => {
        const result = ItemsService.pagination(ItemsService
          .filter(items, req.query), req.query.size, req.query.page);
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

itemsRouter.get('/filter', (req, res) => {
  try {
    ItemsService.setLang(req.query.lang);
    ItemsService.filter(req.query)
      .then((items) => {
        const result = ItemsService.pagination(items, req.query.size, req.query.page);
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
  catch (err) {
    res.status(500).send(err);
  }
});

itemsRouter.get('/recent', (req, res) => {
  try {
    ItemsService.setLang(req.query.lang);
    ItemsService.getRecentItems(req.query.size, req.query.page)
      .then((items) => {
        res.status(200).send(items);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
  catch (err) {
    res.status(500).send(err);
  }
});

itemsRouter.get('/related', (req, res) => {
  try {
    if (!req.query.id) {
      res.status(400).send("NO ID PROVIDED");
      return;
    }
    ItemsService.setLang(req.query.lang);
    ItemsService.getRelatedItems(req.query.id, req.query.size, req.query.page)
      .then((items) => {
        res.status(200).send(items);
      })
      .catch((err) => {
        if (err.message === "NOT FOUND") { // TODO excuse me, wtf?
          res.status(404).send(`NOT FOUND ${req.query.id}`);
          return;
        }
        if (err.message === "BAD ID") {
          res.status(400).send(`BAD ID ${req.query.id}`);
          return;
        }
        res.status(500).send(err);
      });
  }
  catch (err) {
    res.status(500).send(err);
  }
});

itemsRouter.get('/sales', (req, res) => {
  try {
    ItemsService.setLang(req.query.lang);
    ItemsService.getSalesItems(req.query.size, req.query.page)
      .then((items) => {
        res.status(200).send(items);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

itemsRouter.get('/:id', (req, res) => {
  try {
    ItemsService.setLang(req.query.lang);
    ItemsService.getById(req.params.id)
      .then((result) => {
        if (!result) {
          res.status(404).send(`NOT FOUND ${req.params.id}`);
        } else {
          res.status(200).send(result);
        }
      })
      .catch((err) => {
        if (err.message === "BAD ID") { // TODO ???
          res.status(400).send(`BAD ID ${req.params.id}`);
          return;
        }
        res.status(500).send(err);
      });
  }
  catch (err) {
    res.status(500).send(err);
  }
});
