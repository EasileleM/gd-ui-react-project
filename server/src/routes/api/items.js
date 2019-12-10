import express from 'express';
import ItemsService from "../../services/ItemsService";

const router = express.Router();

router.get('/', (req, res) => {
  try {
    if (!req.query.id) {
      res.status(400);
      res.send("NO ID PROVIDED");
      return;
    }
    ItemsService.setLang(req.query.lang);
    const idArray = req.query.id.split(',');
    return ItemsService
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

router.get('/all', (req, res) => {
  try {
    ItemsService.setLang(req.query.lang);
    ItemsService.search(req.query)
        .then(items => {
              let result = ItemsService.filter(items, req.query);
              result = ItemsService.pagination(result, req.query.size, req.query.page);
              res.status(200);
              res.send(JSON.stringify(result));
            }
        )
        .catch(err => {
              console.log(err);
              res.status(500);
              res.send(JSON.stringify(err));
            }
        )
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send(JSON.stringify(err));
  }
});

router.get('/filter', (req, res) => {
  try {
    ItemsService.setLang(req.query.lang);
    ItemsService.filter(req.query)
        .then(items => {
              const result = ItemsService.pagination(items, req.query.size, req.query.page);
              res.status(200);
              res.send(JSON.stringify(result))
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

router.get('/recent', (req, res) => {
  try {
    ItemsService.setLang(req.query.lang);
    ItemsService.getRecentItems(req.query.size, req.query.page)
        .then(items => {
              res.status(200);
              res.send(JSON.stringify(items))
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

router.get('/related', (req, res) => {
  try {
    if (!req.query.id) {
      res.status(400);
      res.send("NO ID PROVIDED");
      return;
    }
    ItemsService.setLang(req.query.lang);
    ItemsService.getRelatedItems(req.query.id, req.query.size, req.query.page)
        .then(items => {
              res.status(200);
              res.send(JSON.stringify(items))
            }
        )
        .catch(err => {
              if (err.message === "NOT FOUND") {
                res.status(404);
                res.send(`NOT FOUND ${req.query.id}`);
                return;
              }
              if (err.message === "BAD ID") {
                res.status(400);
                res.send(`BAD ID ${req.query.id}`);
                return;
              }
              res.status(500);
              res.send(JSON.stringify(err));
            }
        )
  } catch (err) {
    res.status(500);
    res.send(JSON.stringify(err));
  }
});

router.get('/sales', (req, res) => {
  try {
    ItemsService.setLang(req.query.lang);
    ItemsService.getSalesItems(req.query.size, req.query.page)
        .then(items => {
              res.status(200);
              res.send(items);
            }
        )
        .catch(err => {
              console.log(err);
              res.status(500);
              res.send(err);
            }
        )
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send(err);
  }
});

router.get('/:id',  (req, res) => {
  try {
    ItemsService.setLang(req.query.lang);
    ItemsService.getById(req.params.id)
        .then(result => {
          if (!result) {
            res.status(404);
            res.send(`NOT FOUND ${req.params.id}`);
          } else {
            res.status(200);
            res.send(JSON.stringify(result));
          }
        })
        .catch(err => {
          if (err.message === "BAD ID") {
            res.status(400);
            res.send(`BAD ID ${req.params.id}`);
            return;
          }
          res.status(500);
          res.send(JSON.stringify(err));
        })
  } catch (err) {
    res.status(500);
    res.send(JSON.stringify(err));
  }
});

export default router;
