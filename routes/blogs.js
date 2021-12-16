var express = require('express')
var router = express.Router()
var blog = require('../models/blog')
var userSchema = require('../models/user')
var userAuth = require('../middleware/userauth')

// Saving the Blog 
router.post('/PublishBlog', userAuth, async function(req, res) {
    var id = await userSchema.findOne({ _id: req.user._id }).catch((err) => {
        console.log("Error !")
        res.send({ msg: "Something Went Wrong !", redirect: true })
    });
    if (id) {
        if (req.body.BlogTitle !== '' && req.body.BlogContent !== '') {
            console.log(req.body.BlogTitle)
            var data = new blog({
                BlogTitle : req.body.BlogTitle,
                BlogContent : req.body.BlogContent,
                BlogImage : req.body.BlogImage,
                PublishName : req.body.PublishName,
                user : req.user._id
            });
            data.save().then((result) => {
                console.log(result);
                res.send({ msg: "Blog Published Successfully !", redirect: false })
            }).catch((err) => {
                console.log(err);
            });
        }
    } else {
        res.send({ msg: "Something Went Wrong !", redirect: true })
    }
})

// Get All Blogs for Public Page

router.get('/Getblog', async function(req, res) {
    const data = await blog.find();
    res.send(data);
})


// Get the specific blog with id 
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

// Dashboard Route
router.post('/getuserblog/:id', userAuth, async function(req, res) {
    const data = await userSchema.findOne({ _id: req.params.id }).catch((err) => {
        console.log("Error !")
    });
    if (data) {
        const userBlogs = await blog.find({ user: req.params.id })
        res.send(userBlogs);
    }else{
        res.send([])
    }
})

// Delete Blog with Specific ID
router.delete('/deleteBlog/:id',userAuth, async function(req, res) {
    await blog.deleteOne({ _id: req.params.id }).then(() => {
        console.log("Blog Removed")
    }).catch((err) => {
        console.log(err);
    })
})
module.exports = router