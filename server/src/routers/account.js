import express from "express";
import {User} from "../db/Models/user.model";
import UserServiceInstance from "../services/UserService";
import {EMAIL_REGEX, FIRST_NAME_REGEX, LAST_NAME_REGEX, PASSWORD_REGEX} from "../constants/constants";

export const accountRouter = express.Router();

accountRouter.put('/edit', async (req, res) => {
  if (!req.body) {
    return res.status(400).send();
  }

  if (!(LAST_NAME_REGEX.test(req.body.lastName) &&
      FIRST_NAME_REGEX.test(req.body.firstName) &&
      EMAIL_REGEX.test(req.body.email) &&
      (!req.body.newPassword || PASSWORD_REGEX.test(req.body.newPassword)) &&
      PASSWORD_REGEX.test(req.body.oldPassword))) {
    return res.status(400).send("Data is not valid");
  }

  try {
    if (req.isAuthenticated()) {
      const isPasswordCorrect = await UserServiceInstance.authenticateUser(req.user.email, req.body.oldPassword);
      if (isPasswordCorrect) {
        if (!req.body.newPassword) {
          await User.updateOne({email: req.user.email},
              {
                $set: {
                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  email: req.body.email,
                  lang: req.body.lang,//todo add check if language is supported
                }
              });
        } else {
          await User.updateOne({email: req.user.email},
              {
                $set: {
                  password: await UserServiceInstance.hashPassword(req.body.newPassword),
                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  email: req.body.email,
                  lang: req.body.lang,
                }
              });
        }
      return res.status(200).send('Ok');
      }
    }
    return res.status(400).send('Wrong password/email');
  } catch (err) {
    console.trace(err);
    return res.status(500).send(err);
  }
});