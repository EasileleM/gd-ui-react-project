import http from 'http';
import cors from 'cors';

import express from 'express';
import flash from "express-flash";

import session from "express-session";
import passport from "passport";

import connectMongo from "connect-mongo";
import mongoose from "mongoose";

import { passportInit } from "./passport-config";
import { authRouter } from './routers/auth';
import { itemsRouter } from './routers/items';
import { filterRouter } from './routers/filter';
import { newsletterRouter } from './routers/newsletter';
import { sliderRouter } from './routers/slider';
import {config} from "dotenv";

const MongoStore = connectMongo(session);
const port = process.env.PORT;
const dbUri = process.env.MONGODB_URI;

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("DB is connected!");
}).catch((err) => {
  console.log(`Error while connecting DB: ${err}!`);
});

const db = mongoose.connection;

const app = express();

app.server = http.createServer(app);

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
    maxAge: 10 * 60 * 1000
  },
}));

passportInit(passport);

app.use(passport.initialize());

app.use(passport.session());

app.use(cors({
  credentials: true,
  origin: process.env.ORIGIN,
}));

app.options('*', cors());

app.use('/api/auth', authRouter);
app.use('/api/items', itemsRouter);
app.use('/api/slider', sliderRouter);
app.use('/api/newsletter', newsletterRouter);
app.use('/api/filter', filterRouter);

app.server.listen(port, () => {
  console.log(`Up and Runnin' at ${app.server.address().port} port`);
});

export default app;