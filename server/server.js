const User = require("./db/Models/user.model");

const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('express-flash');
const {createServer} = require('http');
const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const initialize = require('./passport-config');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const users = [];
const dev = process.env.NODE_DEV !== 'production';
const nextApp = next({dev});
const handle = nextApp.getRequestHandler();
const port = process.env.PORT || 3000;
const dbUri = process.env.MONGODB_URI || "mongodb+srv://admin:qwerty123456789@react-vptyr.mongodb.net/shop?retryWrites=true&w=majority";
const bcrypt = require('bcrypt');

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
    saveUninitialized: false,
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

  app.post('/api/signIn', checkNotAuthenticated, passport.authenticate(['local', 'anonymId'], {
    successRedirect: '/api/isAuth',
    failureRedirect: '/api/isAuth',
    failureFlash: true
  }));

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
      });
      newUser.save().then((user) => {
        res.statusCode = 201;
        req.login(user, function(err) {
          if (err) { return next(err); }
          return res.redirect('/api/isAuth');
        });
      }).catch(err => {
        res.statusCode = 500;
        res.json(JSON.stringify(err));
      })
    } catch (e) {
      res.statusCode = 500;
      console.log("error : " + e);
      res.json(JSON.stringify(e));
    }
  });

  app.post('/api/logout', checkAuthenticated, (req, res) => {
    req.logout();
    res.status(200).send();
  });

  app.get('/api/isAuth', checkAuthenticated, (req, res) => {
    res.json(req.user);
  });

  app.all('*', (req, res) => {
    return handle(req, res)
  });

  app.listen(port, err => {
    if (err) throw err;
    console.log('listening on port ' + port)
  })
});

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log(`isAuthenticated`);
    console.log(`\nreq: ${req},\nres: ${res}`);
    return res.redirect('/api/isAuth')
  }
  console.log(`isNOTAuthenticated`);
  console.log(`\nreq: ${req},\nres: ${res}`);
  next()
}

function checkAuthenticated(req, res, next) {
  console.log(req.user.uuid)
  if (req.isAuthenticated()) {
    console.log(`isAuthenticated`);
    console.log(`\nreq: ${req},\nres: ${res}`);

    return next()
  }
  console.log(`isNOTAuthenticated`);
  console.log(`\nreq: ${req},\nres: ${res}`);
  res.status(401).send();
}