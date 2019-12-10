import express from "express";
import FilterService from "../../services/FilterService";
const router = express.Router();

router.get('/', (req, res) => {
  try {
    FilterService.setLang(req.query.lang);
    return FilterService
        .getFilterFields()
        .then(item => {
              res.status(200);
              delete item._id;
              res.send(JSON.stringify(item));
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

export default router;