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

module.exports = router