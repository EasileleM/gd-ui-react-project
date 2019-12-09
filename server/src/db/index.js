import mongoose from "mongoose";

const dbUri = process.env.MONGODB_URI || "mongodb+srv://admin:qwerty123456789@react-vptyr.mongodb.net/shop?retryWrites=true&w=majority";

export const dbInit = () => {
  mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("DB is connected!")
  }).catch((err) => {
    console.log(`Error while connecting DB: ${err}!`)
  });
};

export const db = mongoose.connection;
