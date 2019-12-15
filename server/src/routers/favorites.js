import express from "express";
import AuthServiceInstance from "../services/AuthService";
import UserServiceInstance from "../services/UserService";

export const favoritesRouter = express.Router();

favoritesRouter.put('/', async (req, res) => {
  if (!req.body) {
    res.status(400).send();
  }
  try {
    const favorites = req.body.map((id) => {
      return id._id;
    });
    if (req.isAuthenticated()) {
      const result = await UserServiceInstance
        .setFavorites(req.user.email, favorites);
      res.status(200).send(req.user);
    } else {
      req.session.favoritesItems = favorites;
      res.status(200).send(req.session.favoritesItems);
    }
  } catch (err) {
    console.trace(err);
    res.status(500).send(err);
  }
});

favoritesRouter.get('/', async (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user.favoritesItems);
  } else {
    res.send(await AuthServiceInstance.getAnonFavoritesWithItems(req.session.favoritesItems));
  }
});
