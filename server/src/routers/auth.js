import express from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';

import { User } from '../db/Models/user.model';
import { Items } from '../db/Models/item.model';

import { mergeCarts } from '../utils/mergeCarts';

export const authRouter = express.Router();

function authenticate(req, res) { //TODO move it in services/utils
  passport.authenticate('local', function (err, user) {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    if (!user) {
      return res.status(400).send('wrong password or email'); // TODO more informative error message
    }
    req.logIn(user, async function (err) {
      if (err) {
        console.log(err);
        res.status(500).send();
      }

      const { cart: userCart } = await User.findOne({ 'email': req.user.email });
      const anonCart = req.session.cart;
      const mergedCart = mergeCarts(anonCart, userCart);

      await User
        .updateOne(
          { 'email': req.user.email },
          { $set: { cart: mergedCart } },
          { upsert: true }
        )
        .exec();
      return res.redirect('/api/auth/');
    });
  })(req, res);
}

authRouter.post('/signIn', function (req, res, next) {
  authenticate(req, res);
});

authRouter.post('/signUp', async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const userInDb = await User.findOne({ 'email': req.body.email }).exec();

    if (userInDb) {
      res.status(409).send();
      return;
    }

    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      cart: []
    });

    await newUser.save();

    authenticate(req, res);
  }
  catch (err) {
    res.status(500);
    console.error('error : ' + err);
    res.send();
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
    return res.status(200).send(await getAnonCartWithItems(req.session.cart));
  }
});

async function getAnonCartWithItems(cart) {
  const cartDataPromises = cart.map((item) => {
    return Items
      .findById(item.itemId)
      .lean()
      .exec()
      .then((generalData) => {
        generalData.description = generalData.description['en']; // TODO translation
        generalData.name = generalData.name['en'];
        return {
          color: item.color,
          amount: item.amount,
          size: item.size,
          generalData
        }
      });
  });

  return Promise.all(cartDataPromises);
}
