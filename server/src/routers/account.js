import express from "express";
import {User} from "../db/Models/user.model";
import UserServiceInstance from "../services/UserService";

export const accountRouter = express.Router();

accountRouter.put('/edit', async (req, res) => {
  if (!req.body) {
    return res.status(400).send();
  }//todo validate req.body
  try {
    if (req.isAuthenticated() &&
        req.body.email === req.user.email &&
        await UserServiceInstance.authenticateUser(req.body.email, req.body.oldPassword)
    ) {

      const user = await User.updateOne({email: req.body.email},
          {
            $set: {
              password: await UserServiceInstance.hashPassword(req.body.newPassword),
              firstName: req.body.firstName,
              lastName: req.body.lastName
            }
          });//todo make it work for emails
      return res.status(200).send(user);
    }
    return res.status(400).send('Wrong password/email');
  } catch (err) {
    console.trace(err);
    return res.status(500).send(err);
  }


});