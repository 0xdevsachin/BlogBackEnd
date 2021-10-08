var express = require('express')
var router = express.Router();
const { findOne } = require('../models/user');
var userSchema = require('../models/user')

router.post('/auth/signup', async function(req, res) {
    var email = await userSchema.findOne({ email: req.body.email })
    var user = await userSchema.findOne({ username: req.body.username })
    if (user) {
        res.send({ msg: "Username Already Taken", redirect: false })
        console.log("user is already taken")
    } else if (email) {
        res.send({ msg: "Email Already Taken", redirect: false })
        console.log("email is already taken")
    } else if (req.body.password !== req.body.cpassword) {
        res.send("Password and Confirm Password must be same")
    } else {
        res.send({ msg: "Account Registered Succesfully", redirect: true })
        const saveData = new userSchema(req.body);
        saveData.save().then(() => {
            console.log(saveData);
        }).catch((err) => {
            console.log(err);
        });
    }

})

module.exports = router