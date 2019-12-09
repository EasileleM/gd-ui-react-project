import express from 'express';
import passport from "passport";
import {User} from "../../db/Models/user.model";
import bcrypt from "bcrypt";
import next from "next";
import {Items} from "../../db/Models/item.model";

const router = express.Router();

router.post('/signIn', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return res.status(500).send(err);
    }
    if (!user) {
      return res.status(400).send("wrong password or email");
    }
    req.logIn(user, async function (err) {
      if (err) {
        res.status(500).send(err);
      }
      if (req.session.cart) {
        const {cart: userCart} = await User.findOne({"email": req.user.email});
        const anonCart = req.session.cart;
        const mergedCart = mergeCarts(anonCart, userCart);
        await User
            .updateOne(
                {"email": req.user.email},
                {$set: {cart: mergedCart}},
                {upsert: true})
            .exec();
        return res.redirect('/api/auth/');

      }
      return res.redirect('/api/auth/');

    });
  })(req, res, next)
});

router.post('/signUp', async (req, res) => {
  try {
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const userInDb = await User.findOne({'email': req.body.email}).exec();
    if (userInDb) {
      res.status(409).send();
      return;
    }
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      cart: req.session.cart ? req.session.cart : [],
    });

    await newUser.save();

    passport.authenticate('local', function (err, user, info) {
      if (err) {
        return res.status(500).send(err);
      }
      if (!user) {
        return res.status(400).send("wrong password or email");
      }
      req.logIn(user, async function (err) {
        if (err) {
          res.status(500).send(err);
        }
        if (req.session.cart) {
          const {cart: userCart} = await User.findOne({"email": req.user.email});
          const anonCart = req.session.cart;
          const mergedCart = mergeCarts(anonCart, userCart);
          await User
              .updateOne(
                  {"email": req.user.email},
                  {$set: {cart: mergedCart}},
                  {upsert: true})
              .exec();
        }
        return res.redirect('/api//auth/');
      });
    })(req, res, next)
  } catch (e) {
    res.status(500);
    console.error("error : " + e);
    res.send(JSON.stringify(e));
  }
});

function mergeCarts(anonCart, userCart) {
  let cart1 = [...userCart];
  const cart2 = [...anonCart];

  for (let i = 0; i < cart1.length; i++) {
    for (let j = 0; j < anonCart.length; j++) {
      const currentItem1 = cart1[j];
      const currentItem2 = cart1[i];
      if (
          currentItem2.itemId.toString() === currentItem1.itemId.toString() &&
          currentItem2.size === currentItem1.size &&
          currentItem2.color === currentItem1.color
      ) {
        currentItem1.amount += currentItem2.amount;
        currentItem2.splice(j, 1);
        j--;
      }
    }
  }

  return [...cart1, ...cart2];
}

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(200).send();
});

router.get('/', async (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else if (!req.session.cart) {
    return res.status(200).send({cartItems: []});
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
          generalData.description = generalData.description["en"];
          generalData.name = generalData.name["en"];
          return {
            color: item.color,
            amount: item.amount,
            size: item.size,
            generalData
          }
        })
  });

  return Promise.all(cartDataPromises);
}

export default router;