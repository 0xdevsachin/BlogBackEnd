var express = require('express')
var router = express.Router()
var blog = require('../models/blog')

router.post('/PublishBlog', async function(req, res) {
    res.send("Data Recieved !");
    if (req.body.BlogTitle != '' && req.body.BlogContent != '') {
        var data = new blog(req.body);
        data.save().then((result) => {
            console.log("Data Saved");
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
    }
})
router.get('/Getblog', async function(req, res) {
    const data = await blog.find();
    res.send(data);
})
router.get('/Getblog/:id', async function(req, res) {
    const data = await blog.findOne({ _id: req.params.id }).catch((err) => {
        console.log("Error !")
    });
    if (!data) {
        res.send({ msg: "Sorry! Blog Not Found", code: 404 })
    } else {
        res.send(data);
    }
})

module.exports = router