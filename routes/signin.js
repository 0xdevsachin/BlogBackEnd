var express = require('express')
var router = express.Router()
var userSchema = require('../models/user')


router.post('/auth/signin', async function(req, res) {
    var pass = await userSchema.findOne({ password: req.body.password })
    var user = await userSchema.find({ username: req.body.username })
    if (req.body.username === '' || req.body.password === '') {
        res.send({ msg: "Something Went Wrong ", redirect: true })
    } else if (!user) {
        res.send({ msg: "User not Exist", redirect: false })
        console.log("user not found")
    } else if (!pass) {
        res.send({ msg: "Password Mis Match", redirect: false })
        console.log("password not found ")
    } else {
        res.send({ msg: "Login Succesfully", user, redirect: true })
    }
})

module.exports = router