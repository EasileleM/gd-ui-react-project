const User = require("./db/Models/user.model");

const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('express-flash');
const {createServer} = require('http');
const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const initialize = require('./passpoort-config');
const cors = require('cors');

const users = [];
//next.js configuration
const dev = process.env.NODE_DEV !== 'production';
const nextApp = next({dev});
const handle = nextApp.getRequestHandler();
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

initialize(passport);

nextApp.prepare().then(() => {
  const app = express();
  app.use(bodyParser.json());
  app.use(flash());
  app.use(session({
    secret: "Meesha Track Jacket",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10 * 60 * 1000,
    },
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cors({
    credentials: true,
    origin: 'http://localhost:3001'
  }));
  app.options('*', cors());

  app.post('/api/signIn', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/api/isAuth',
    failureRedirect: '/api/isAuth',
    failureFlash: true
  }));

  app.post('/api/signUp', checkNotAuthenticated, (req, res) => {
    try {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });
      newUser.save().then((result) => {
        res.statusCode = 201;

        res.json(JSON.stringify(result))
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

  app.get('/api/isAuth',checkAuthenticated, (req, res) => {
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
    return res.redirect('/')
  }
  next()
}

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(401).send();
}