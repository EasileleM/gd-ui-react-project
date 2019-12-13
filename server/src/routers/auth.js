import express from 'express';

import AuthServiceInstance from "../services/AuthService";
import UserServiceInstance from "../services/UserService";

export const authRouter = express.Router();

authRouter.post('/signIn', function (req, res, next) {
  try {
    AuthServiceInstance.authenticate(req, res); // TODO rename service
  }
  catch (err) {
    console.trace(err);
    res.status(500).send();
  }
});

authRouter.post('/signUp', async (req, res) => {
  try {
    AuthServiceInstance.signUp(req, res);
  }
  catch (err) {
    console.trace(err);
    res.status(500).send();
  }
});

authRouter.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(200).send();
});

authRouter.get('/', async (req, res) => {
  if (req.isAuthenticated()) {
    res.send(await UserServiceInstance.prepare(req.user, req.query.lang));
  } else {
    req.session.cartItems = req.session.cartItems ? req.session.cartItems : [];
    req.session.favoritesItems = req.session.favoritesItems ? req.session.favoritesItems : [];
    return res.status(200).send({
      cartItems: await AuthServiceInstance.getAnonCartWithItems(req.session.cartItems, req.query.lang),
      favoritesItems: await AuthServiceInstance.getAnonFavoritesWithItems(req.session.favoritesItems, req.query.lang)
    });
  }
});


