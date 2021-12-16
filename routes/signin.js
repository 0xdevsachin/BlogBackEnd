var express = require('express')
var router = express.Router()
var userSchema = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/auth/signin', async function(req, res) {
    var user = await userSchema.findOne({ username: req.body.username }).catch((err) => {
        console.log(err)
    })

    if (req.body.username === '' || req.body.password === '') {
        res.send({ msg: "Something Went Wrong ", redirect: true })
    }
    if (user) {
        var pass = user.password
        // comapring using Bcrypt JS
        const password = await bcrypt.compare(req.body.password, pass)
        if (!password) {
            res.send({ msg: "Invalid Credentials", redirect: false })
        }
        else{
            const data = {
                user : user
            }
            const authtoken = jwt.sign(data, process.env.JWT_SECRET)
            res.send({ msg: "Login Succesfully", user, authtoken, redirect: true })
        }
    } else {
        res.send({ msg: "Invalid Credentials", redirect: false })
        console.log("User not exist ")
    }

})

module.exports = router