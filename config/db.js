require('dotenv').config();
const mongoose = require('mongoose');

const URL = "mongodb+srv://mern-blogger:mern-bloggerOPxD@cluster0.9dudg.mongodb.net/Blogger";

const db = async() => {
    await mongoose.connect(URL, {
        useNewUrlParser: true,
    }).then().catch((err) => {
        console.log(err);
    })
}

module.exports = db;