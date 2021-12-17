var express = require('express')
var router = express.Router();
var userSchema = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/auth/signup', async function(req, res) {
    console.log(req.body);
    var email = await userSchema.findOne({ email: req.body.email })
    var user = await userSchema.findOne({ username: req.body.username })
    if (req.body.username == '' || req.body.email == '' || req.body.password == '' || req.body.cpassword == '') {
        res.send({ msg: "Something Went Wrong ", success: true })
        console.log(saveData);
    } else if (user) {
        res.send({ msg: "Username Already Exist", sucess: false })
        console.log("user is already exist")
    } else if (email) {
        res.send({ msg: "Email Already Exist", success: false })
        console.log("email is already exist")
    } else if (req.body.password !== req.body.cpassword) {
        res.send("Password and Confirm Password must be same")
    } else {
        //Generating Salt and Hash for the password
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);
        
        const saveData = new userSchema({
            username : req.body.username,
            email : req.body.password,
            password : securePassword,
        });
        await saveData.save().then(() => {
            console.log(saveData);
        }).catch((err) => {
            console.log("error");
        });
        const data = {
            user : saveData
        }
        const authtoken = jwt.sign(data, process.env.JWT_SECRET)
        res.status(200).send({ msg: "Account Registered Succesfully",authtoken, success: true })
    }

})

module.exports = router