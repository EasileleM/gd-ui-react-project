import express from "express";
import {User} from "../db/Models/user.model";

export const accountRouter = express.Router();

accountRouter.put('/edit', async (req, res) => {
  if (!req.body) {
    return res.status(400).send()
  }

  if (req.isAuthenticated() && req.body.email === req.user.email) {
    try {
      const user = await User.findOneAndUpdate({email: req.body.email}, req.body, {
        new: true
      });
      return res.status(200).send(user);
    } catch (e) {
      return res.status(500).send(e)
    }
  }


});