import express from "express";
import {User} from '../db/Models/user.model'

export const cartRouter = express.Router();

cartRouter.put('/',  async (req, res) => {
  if (!req.body) {
    res.status(400).send()
  }
  try{
    const data = req.body;
    const cart = data.map(current => {
      return {
        itemId: current._id,
        size: current.size,
        color: current.color,
        amount: current.amount,
      }
    });
    if (req.isAuthenticated()) {
      const result = await User.updateOne(
          { "email": req.user.info.email },
          { $set: { cart } },
          { upsert: false }).exec();
      res.status(200).send(req.user);
    } else {
      req.session.cart = cart;
      res.status(200).send(req.session.cart)
    }
  }catch (e) {
    res.status(500).send(e)
  }
});

cartRouter.get('/',  async (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user.cartItems)
  } else {
    res.send(req.session.cart)
  }
});
