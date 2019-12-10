import express from "express";
import FilterService from "../services/FilterService";
export const filterRouter = express.Router();

filterRouter.get('/', (req, res) => {
  FilterService.setLang(req.query.lang);
  return FilterService
    .getFilterFields()
    .then((item) => {
      const itemCopy = {};
      for (const field in item) {
        if (item.hasOwnProperty(field) && field != "_id") {
          itemCopy[field] = item[field];
        }
      }
      res.status(200).send(itemCopy);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
