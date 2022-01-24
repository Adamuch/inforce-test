import express from "express";
import {  mongo_base} from "./index.js";
import { ObjectId } from "mongodb";

const router = express.Router();

const bookCollection = async () => {
  await mongo_base.connect((error) => {
    if (error) {
      throw error;
    }
  });
  const book_list = await mongo_base.db().collection("Books");
  return book_list;
};

// All books in dataBase
router.get("/", async (request, response) => {
  const data_books = await bookCollection();
data_books.find({}).toArray((err, result) => {
    if (err) throw err;
    response.json(result);
  });
});
// get data by id book
router.get("/:id", async (request, response) => {
  const { id } = request.params;
  let objectId;
  try {
    objectId = new ObjectId(id);
  } catch (err) {}
  const collection = await bookCollection();
  const req_book = await collection.findOne({ _id: objectId });
  if (req_book) {
    response.json(req_book);
  } else {
    response.send("Cant find this book!");
  }
});
// Add book into dataBase
router.post("/", async (request, response) => {
  const body = request.body;
  const collection = await bookCollection();
  try {
    const result = await collection.insertOne(body);
    response.json(result);
  } catch (err) {
    response.send(`${err.message}`);
  }
});
// Update book details by id
router.put("/:id", async (request, responce) => {
  const { id } = request.params;
  const body = request.body;
  const collection = await bookCollection();
  if (collection) {
    collection.find({}).toArray(async (err, result) => {
      if (err) throw err;
      const final_book = [];
      result.forEach((book) => {
        if (book._id.toString() == id) {
          const new_body = body;
          final_book.push({ id, new_body });
        }
      });
      if (final_book.length) {
        const equal_id = new ObjectId(final_book[0].id);
        const body_change = final_book[0].new_body;
        try {
          const status = await collection.updateOne(
            { _id: equal_id },
            { $set: body_change },
            { upsert: true }
          );
          if (status.acknowledged) {
            const UPDATED_BOOK = await collection.findOne({ _id: equal_id});
            responce.send(UPDATED_BOOK);
          }
        } catch (err) {
          responce.send(`System update Error: ${err.message}`);
        }
      } else {
        responce.send(`Book with id: ${id} doesn\'t exist!`);
      }
    });
  } else {
    responce.send("System Error!");
  }
});
// Delete book by id
router.delete("/:id", async (request, responce) => {
  const { id } = request.params;
  const collection = await bookCollection();
  if (collection) {
   collection.find({}).toArray(async (err, result) => {
      if (err) throw err;
      const DEFINED_BOOK_ID = [];
      result.forEach((book) => {
        if (book._id.toString() == id) {
          DEFINED_BOOK_ID.push(book._id);
        }
      });
      if (DEFINED_BOOK_ID.length) {
        const EQUAL_ID = DEFINED_BOOK_ID[0];
        try {
          const RESULT = await COLLECTION.deleteOne({ _id: EQUAL_ID });
          if (RESULT.acknowledged) {
            responce.send(RESULT);
          }
        } catch (err) {
          responce.send(`System delete Error: ${err.message}`);
        }
      } else {
        responce.send(`Book with id: ${id} doesn\'t exist!`);
      }
    });
  } else {
    responce.send("System Error!");
  }
});

export default router;