const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3300;


app.use(cors());


app.post('/api', (req, res) => {
    console.log(req.body);
    res.send("Api Call Recieved")
    console.log("React Request ")
})

app.listen(PORT, () => {
    console.log('Server started at http://localhost:3300')
})