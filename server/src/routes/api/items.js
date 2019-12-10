import express from 'express';
import ItemsService from '../../services/ItemsService';

const router = express.Router();
const errors = {
  noID: 'NO ID PROVIDED',
  notFound: 'NOT FOUND',
  badID: 'BAD ID',
}

router.get('/', async (req, res) => {
  try {
    if (!req.query.id) {
      res.status(400);
      res.send(errors.noID);
      return;
    }
    ItemsService.setLang(req.query.lang);
    const idArray = req.query.id.split(',');
    await ItemsService
      .getByIdArray(idArray)
      .then(items => {
        res.status(200);
        const rejectedId = [];
        if (idArray && idArray.length > items.length) {
          for (const id of idArray) {
            if (!items.some((item) => item._id === id)) {
              rejectedId.push(id);
            }
          }
        }
        res.send(JSON.stringify({ items, rejectedId }));
      }
      )
  } catch (err) {
    res.status(500);
    res.send(JSON.stringify(err));
  }
});

router.get('/all', async (req, res) => {
  try {
    ItemsService.setLang(req.query.lang);
    await ItemsService.search(req.query)
      .then(items => {
        let result = ItemsService.filter(items, req.query);
        result = ItemsService.pagination(result, req.query.size, req.query.page);
        res.status(200);
        res.send(JSON.stringify(result));
      }
      )
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send(JSON.stringify(err));
  }
});

router.get('/filter', async (req, res) => {
  try {
    ItemsService.setLang(req.query.lang);
    await ItemsService.filter(req.query)
      .then(items => {
        const result = ItemsService.pagination(items, req.query.size, req.query.page);
        res.status(200);
        res.send(JSON.stringify(result))
      }
      )
  } catch (err) {
    res.status(500);
    res.send(JSON.stringify(err));
  }
});

router.get('/recent', async (req, res) => {
  try {
    ItemsService.setLang(req.query.lang);
    await ItemsService.getRecentItems(req.query.size, req.query.page)
      .then(items => {
        res.status(200);
        res.send(JSON.stringify(items))
      }
      )
  } catch (err) {
    res.status(500);
    res.send(JSON.stringify(err));
  }
});

router.get('/related', async (req, res) => {
  try {
    if (!req.query.id) {
      res.status(400);
      res.send(errors.noID);
      return;
    }
    ItemsService.setLang(req.query.lang);
    await ItemsService.getRelatedItems(req.query.id, req.query.size, req.query.page)
      .then(items => {
        res.status(200);
        res.send(JSON.stringify(items))
      }
      )
  } catch (err) {
    if (err.message === 'NOT FOUND') {
      res.status(404);
      res.send(`${errors.notFound} ${req.query.id}`);
      return;
    }
    if (err.message === 'BAD ID') {
      res.status(400);
      res.send(`${errors.badID} ${req.query.id}`);
      return;
    }
    res.status(500);
    res.send(JSON.stringify(err));
  }
});

router.get('/sales', async (req, res) => {
  try {
    ItemsService.setLang(req.query.lang);
    await ItemsService.getSalesItems(req.query.size, req.query.page)
      .then(items => {
        res.status(200);
        res.send(items);
      }
      )
  } catch (err) {
    console.error('error: ' + err);
    res.status(500);
    res.send(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    ItemsService.setLang(req.query.lang);
    await ItemsService.getById(req.params.id)
      .then(result => {
        if (!result) {
          res.status(404);
          res.send(`${errors.notFound} ${req.params.id}`);
        } else {
          res.status(200);
          res.send(JSON.stringify(result));
        }
      })
  } catch (err) {
    if (err.message === 'BAD ID') {
      res.status(400);
      res.send(`${errors.badID} ${req.params.id}`);
      return;
    }
    res.status(500);
    res.send(JSON.stringify(err));
  }
});

export default router;
