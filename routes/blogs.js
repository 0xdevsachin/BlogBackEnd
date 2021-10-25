var express = require('express')
var router = express.Router()
var blog = require('../models/blog')
var userSchema = require('../models/user')

router.post('/PublishBlog', async function(req, res) {
    var id = await userSchema.findOne({ _id: req.body.userID }).catch((err) => {
        console.log("Error !")
        res.send({ msg: "Something Went Wrong !", redirect: true })
    });
    if (id) {
        if (req.body.BlogTitle != '' && req.body.BlogContent != '') {
            var data = new blog(req.body);
            data.save().then((result) => {
                res.send({ msg: "Blog Published Successfully !", redirect: false })
            }).catch((err) => {
                console.log("Error !");
            });
        }
    } else {
        res.send({ msg: "Something Went Wrong !", redirect: true })
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
        res.send({ msg: data, code: 200 });
    }
})

router.post('/getuserblog/:id', async function(req, res) {
    const data = await userSchema.findOne({ _id: req.params.id }).catch((err) => {
        console.log("Error !")
    });
    if (data) {
        const userBlogs = await blog.find({ userID: req.params.id })
        res.send(userBlogs);
    }
})

router.delete('/deleteBlog/:id', async function(req, res) {
    await blog.deleteOne({ _id: req.params.id }).then(() => {
        console.log("Blog Removed")
    }).catch((err) => {
        console.log(err);
    })
})
module.exports = router