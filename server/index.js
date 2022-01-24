import express from "express";
import { MongoClient } from "mongodb";
import router from './booksRouter.js'
import bodyParser from "body-parser";
import dotenv from "dotenv"

dotenv.config()
// Standart port
const PORT = process.env.PORT ?? 8080;
const app = express();

const data_url= `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_SRV}/${process.env.MONGODB_NAME}?${process.env.MONGODB_ARGS}`
const mongo_base = new MongoClient(data_url);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/books", router);

const startServer = async () => {
  try {
    await mongo_base.connect((error) => {
      if (error) throw error
    });
    app.listen(PORT, () => {
      console.log("Server has been started...");
    });
  } catch (err) {
    if (err) throw err;
  }
};

startServer();
export { mongo_base };