import {User} from "./db/Models/user.model";
import express from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import flash from 'express-flash';
import passport from 'passport';
import initialize from './passport-config';
import cors from 'cors';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import bcrypt from 'bcrypt';
import {Items} from "./db/Models/item.model";

const MongoStore = connectMongo(session);
const dev = process.env.NODE_DEV !== 'production';
const nextApp = next({dev});
const nextHandle = nextApp.getRequestHandler();
const port = process.env.PORT || 3000;
const dbUri = process.env.MONGODB_URI || "mongodb+srv://admin:qwerty123456789@react-vptyr.mongodb.net/shop?retryWrites=true&w=majority";

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("DB is connected!")
}).catch((err) => {
  console.log(`Error while connecting DB: ${err}!`)
});

const db = mongoose.connection;

initialize(passport);

nextApp.prepare().then(() => {
  const app = express();
  app.use(bodyParser.json());
  app.use(flash());
  app.use(session({
    secret: 'Meesha Track Jacket',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: db,
      secret: 'Misha Track Jacket'
    }),
    cookie: {
      maxAge: 10 * 60 * 1000,
    },
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cors({
    credentials: true,
    origin: process.env.ORIGIN || 'http://localhost:3001',
  }));
  app.options('*', cors());

  app.get('/api/checkUser', checkAuthenticated, (req, res) => {
    res.status(200).send(req.user);
  });

  app.get('/api/cart', (req, res) => {
    if (req.isAuthenticated()) {
      res.send(req.user.cartItems)
    } else {
      res.send(req.session.cart)
    }
  });

  app.put('/api/cart', async (req, res) => {
    if (!req.body) {
      res.status(200).send()
    }
    const data = req.body;
    const cart = data.map(current => {
      return {
        itemId: current.generalData._id,
        size: current.size,
        color: current.color,
        amount: current.amount,
      }
    });
    if (req.isAuthenticated()) {
      await User.updateOne(
          {"email": req.user.info.email},
          {$set: {cart}},
          {upsert: false}).exec();
      res.status(200).send(req.user);

    } else {
      req.session.cart = cart;
      res.status(200).send(req.session.cart)
    }
  });

  app.post('/api/signIn', checkNotAuthenticated, function (req, res, next) {
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
              let userCart = await User.findOne({"email": req.user.email});
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
                      {"email": req.user.email},
                      {$set: {cart: mergedCart}},
                      {upsert: true})
                  .exec();
              return res.redirect('/api/isAuth');

            }
            console.log(req.user);
            return res.redirect('/api/isAuth');

          });
        })(req, res, next)
      }
  );

  app.post('/api/signUp', checkNotAuthenticated, async (req, res) => {
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
            let userCart = await User.findOne({"email": req.user.email});
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
                    {"email": req.user.email},
                    {$set: {cart: mergedCart}},
                    {upsert: true})
                .exec();
            return res.status(200).send(req.user);
          }
          return res.status(200).send(req.user);
        });
      })(req, res, next)

    } catch (e) {
      res.statusCode = 500;
      console.log("error : " + e);
      res.json(JSON.stringify(e));
    }
  });

  app.post('/api/logout', checkAuthenticated, (req, res) => {
    req.logout();
    req.session.destroy();
    res.status(200).send();
  });

  app.get('/api/isAuth', checkAuthenticated, (req, res) => {
    res.json(req.user);
  });

  app.all('*', (req, res) => {
    return nextHandle(req, res)
  });

  app.listen(port, err => {
    if (err) throw err;
    console.log('listening on port ' + port)
  })
});

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.status(400).send();
  }
  next()
}

async function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  if (!req.session.cart) {
    return res.status(200).send({cartItems: []});
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
  res.status(200).send({cartItems: result});
}