require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT;
var signup = require('./routes/signup')
var signin = require('./routes/signin')
const db = require('./config/db')
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

db().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`)
        console.log('DB Connected successfully');
    })
}).catch((err) => {
    console.log(err);
})


app.use('/api', signup);
app.use('/api', signin);