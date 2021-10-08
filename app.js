require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3300;
var signup = require('./routes/signup')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.listen(3300, () => {
    console.log('Server started at http://localhost:3300')
})


app.use('/api', signup);