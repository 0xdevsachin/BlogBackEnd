var express = require('express')
var router = express.Router()
var blog = require('../models/blog')
var userSchema = require('../models/user')
var userAuth = require('../middleware/userauth')

// Saving the Blog 
router.post('/PublishBlog', userAuth, async function(req, res) {
    var id = await userSchema.findOne({ _id: req.user }).catch((err) => {
        console.log(err)
        res.send({ msg: "Something Went Wrong !", redirect: true })
    });
    if (id) {
        if (req.body.BlogTitle && req.body.BlogContent) {
            var data = new blog({
                BlogTitle : req.body.BlogTitle,
                BlogContent : req.body.BlogContent,
                BlogImage : req.body.BlogImage,
                PublishName : id.username,  
                user : req.user
            });
            data.save().then((result) => {
                res.status(200).send({ msg: "Blog Published Successfully !", redirect: false })
            }).catch((err) => {
                console.log(err);
            });
        }else{
            return res.send({msg : "Blog Title or Content Can't Be Empty", redirect: false})
        }
    } else {
        res.send({ msg: "Something Went Wrong !", redirect: true })
    }
})

// Get All Blogs for Public Page

router.get('/Getblog', async function(req, res) {
    const data = await blog.find();
    res.status(200).send(data);
})


// Get the specific blog with id 
router.get('/Getblog/:id', async function(req, res) {
    const data = await blog.findOne({ _id: req.params.id }).catch((err) => {
        console.log(err)
    });
    if (!data) {
        res.status(404).send({ msg: "Sorry! Blog Not Found", code: 404 })
    } else {
        res.status(200).send({ msg: data, code: 200 });
    }
})

// Dashboard Route
router.post('/getuserblog', userAuth, async function(req, res) {
    const data = await userSchema.findOne({ _id: req.user }).catch((err) => {
        console.log("Error !")
    });
    if (data) {
        const userBlogs = await blog.find({ user: req.user })
        res.status(200).send(userBlogs);
    }else{
        res.send([])
    }
})

// Update blog Route
router.put('/updateBlog/:id', userAuth, async (req,res) =>{
    try {
        var { BlogTitle, BlogContent, BlogImage } = req.body;
        const UpdatedBlog = {};
        // Setting values into new Object
        if(BlogTitle) {UpdatedBlog.BlogTitle = BlogTitle}
        if(BlogContent) {UpdatedBlog.BlogContent = BlogContent}
        if(BlogImage){UpdatedBlog.BlogImage = BlogImage}
        let NewBlog = await blog.findById(req.params.id);
        if(!NewBlog){
            return res.send({msg : "Blog not Exist !"})
        }
        if(NewBlog.user.toString() !== req.user){
            return res.send({msg : "Not Allowed"})
        }
        await blog.findByIdAndUpdate(req.params.id, {$set : UpdatedBlog}).then(() =>{
            res.status(200).send({msg : "Blog Updated successFully"})
        }).catch((err) =>{
            res.status(400).send({msg : "Bad Request"})
        })
        
    } catch (error) {
        res.status(500).send("internal server error ")
    }
})


// Delete Blog with Specific ID
router.delete('/deleteBlog/:id',userAuth, async function(req, res) {
    try {
        let DeleteBlog = await blog.findById(req.params.id);
    if(!DeleteBlog){
        return res.status(200).send("Blog not Exist !")
    }
    if(DeleteBlog.user.toString() !== req.user){
        return res.status(200).send("Not Allowed")
    }
    await blog.findByIdAndDelete({ _id: req.params.id }).then(() => {
        console.log("Blog Removed")
    }).catch((err) => {
        console.log(err);
    })
    res.status(200).send("Blog removed")
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})
module.exports = router