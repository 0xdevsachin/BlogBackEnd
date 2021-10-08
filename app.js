require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3300;
var signup = require('./routes/signup')
const db = require('./config/db')
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

db().then(() => {
    app.listen(3300, () => {
        console.log('Server started at http://localhost:3300')
        console.log('DB Connected successfully');
    })
}).catch((err) => {
    console.log(err);
})


app.use('/api', signup);