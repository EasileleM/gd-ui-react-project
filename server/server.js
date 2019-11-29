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

initialize(passport,);

nextApp.prepare().then(() => {
  const app = express();
  app.use(bodyParser.json());
  app.use(flash());
  app.use(session({
    secret: "Meesha Track Jacket",
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cors());

  app.post('/api/signIn', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/api/items',
    failureRedirect: '/api/items/all',
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
        console.log("nice : " + res.statusCode);

        res.json(JSON.stringify(result))
      }).catch(err => {
        res.statusCode = 500;
        res.json(JSON.stringify(err));
        console.log("error : " + err)

      })
    } catch (e) {
      res.statusCode = 500;
      console.log("error : " + e);
      res.json(JSON.stringify(e));
    }
  });

  app.delete('/api/logout', checkAuthenticated, (req, res) => {
    req.logOut();
    res.redirect('/login')
  });

  app.get('/api/isAuth', (req, res) => {
    if (req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.json(req.isAuthenticated());
    }
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
  res.redirect('/login')
}