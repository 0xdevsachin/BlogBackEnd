var express = require('express')
var router = express.Router()
var userSchema = require('../models/user')


router.post('/auth/signin', async function(req, res) {
    var user = await userSchema.findOne({ username: req.body.username }).catch((err) => {
        console.log(err)
    })

    if (req.body.username === '' || req.body.password === '') {
        res.send({ msg: "Something Went Wrong ", redirect: true })
    }
    if (user) {
        var pass = user.password
        if (pass !== req.body.password) {
            res.send({ msg: "Invalid Credentials", redirect: false })
            console.log("password not found")
            return;
        }
        res.send({ msg: "Login Succesfully", user, redirect: true })
    } else {
        res.send({ msg: "User Does not Exist", redirect: false })
        console.log("User not exist ")
    }

})

module.exports = router