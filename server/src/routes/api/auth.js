import express from 'express';
import passport from "passport";
import {User} from "../../db/Models/user.model";
import bcrypt from "bcrypt";
import next from "next";
import {Items} from "../../db/Models/item.model";
const router = express.Router();

router.post('/signIn', checkNotAuthenticated, function (req, res, next) {
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
            let userCart = await User.findOne({ "email": req.user.email });
            userCart = userCart.cart;
            const anonCart = req.session.cart;

            for (let i = 0; i < userCart.length; i++) {
              for (let j = 0; j < anonCart.length; j++) {
                if (
                    anonCart[j].itemId.toString() === userCart[i].itemId.toString() &&
                    anonCart[j].size === userCart[i].size &&
                    anonCart[j].color === userCart[i].color
                ) {
                  userCart[i].amount += anonCart[j].amount;
                  anonCart.splice(j, 1);
                  j--;
                }
              }
            }

            const mergedCart = [...userCart, ...anonCart];

            await User
                .updateOne(
                    { "email": req.user.email },
                    { $set: { cart: mergedCart } },
                    { upsert: true })
                .exec();
            return res.redirect('/api/auth/isAuth');

          }
          console.log(req.user);
          return res.redirect('/api/auth/isAuth');

        });
      })(req, res, next)
    });

router.post('/signUp', checkNotAuthenticated, async (req, res) => {
  console.log('yep')
  try {
    console.log('yep')
    const salt = await bcrypt.genSaltSync(10);
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
      cart: req.session.cart ? req.session.cart : [],
    });

    await newUser.save();

    passport.authenticate('local', function (err, user, info) {
      if (err) {
        return res.status(500).send(err);
      }
      if (!user) {
        console.log(1)
        return res.status(400).send("wrong password or email");
      }
      req.logIn(user, async function (err) {
        if (err) {
          res.status(500).send(err);
        }
        if (req.session.cart) {
          let userCart = await User.findOne({ "email": req.user.email });
          userCart = userCart.cart;
          const anonCart = req.session.cart;

          for (let i = 0; i < userCart.length; i++) {
            for (let j = 0; j < anonCart.length; j++) {
              if (
                  anonCart[j].itemId.toString() === userCart[i].itemId.toString() &&
                  anonCart[j].size === userCart[i].size &&
                  anonCart[j].color === userCart[i].color
              ) {
                userCart[i].amount += anonCart[j].amount;
                anonCart.splice(j, 1);
                j--;
              }
            }
          }

          const mergedCart = [...userCart, ...anonCart];

          await User
              .updateOne(
                  { "email": req.user.email },
                  { $set: { cart: mergedCart } },
                  { upsert: true })
              .exec();
          return res.redirect('/api/isAuth');
        }
        return res.redirect('/api/isAuth');
      });
    })(req, res, next)

  } catch (e) {
    res.statusCode = 500;
    console.log("error : " + e);
    res.json(JSON.stringify(e));
  }
});

router.post('/logout', checkAuthenticated, (req, res) => {
  req.logout();
  req.session.destroy();
  res.status(200).send();
});

router.get('/isAuth', checkAuthenticated, (req, res) => {
  res.json(req.user);
});


function checkNotAuthenticated(req, res, next) {
  // if (req.isAuthenticated()) {
  //   return res.status(400).send(); TODO
  // }
  next()
}

async function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  if (!req.session.cart) {
    return res.status(200).send({ cartItems: [] });
  }
  const cartDataPromises = req.session.cart.map((item) => {

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

  const result = await Promise.all(cartDataPromises);
  res.status(200).send({ cartItems: result });
}

export default router;