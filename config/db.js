require("dotenv").config();
const mongoose = require("mongoose");

const URL = process.env.MONGO_URL;

const db = async () => {
  await mongoose
    .connect(URL, {
      useNewUrlParser: true,
    })
    .then()
    .catch((err) => {
      console.log(err);
    });
};

module.exports = db;
