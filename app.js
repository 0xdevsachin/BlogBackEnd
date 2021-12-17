require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
var signup = require('./routes/signup')
var signin = require('./routes/signin')
var PublishBlog = require('./routes/blogs')
const db = require('./config/db')
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
})

db().then(() => {
    console.log('DB Connected successfully');
}).catch((err) => {
    console.log(err);
})


app.get('/', (req,res) =>{
    res.status(200).json({msg : "Hello World!", port : PORT})
})
app.use('/api', signup);
app.use('/api', signin);
app.use('/api', PublishBlog)