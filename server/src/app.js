import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import flash from "express-flash";
import session from "express-session";
import passport from "passport";
import connectMongo from "connect-mongo";
import mongoose from "mongoose";

import passportInit from "./passport-config";
import authRouter from './routes/api/auth';
import itemsRouter from './routes/api/items';
import filterRouter from './routes/api/filter';
import newsletterRouter from './routes/api/newsletter';
import sliderRouter from './routes/api/slider';

const MongoStore = connectMongo(session);
const dev = process.env.NODE_DEV !== 'production';
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

passportInit(passport);

const app = express();
app.server = http.createServer(app);
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  credentials: true,
  origin: process.env.ORIGIN || 'http://localhost:3001',
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