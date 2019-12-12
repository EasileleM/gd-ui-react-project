import express from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';

import AuthServiceInstance from "../services/AuthService";
import { User } from '../db/Models/user.model';
import { Items } from '../db/Models/item.model';


export const authRouter = express.Router();

authRouter.post('/signIn', function (req, res, next) {
  AuthServiceInstance.authenticate(req, res);
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
    res.send(req.user);
  } else if (!req.session.cart) {
    return res.status(200).send({ cartItems: [] });
  } else if (req.session.cart) {
    return res.status(200).send(await AuthServiceInstance.getAnonCartWithItems(req.session.cart));
  }
});


