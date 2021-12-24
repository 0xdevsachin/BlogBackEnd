var express = require("express");
var router = express.Router();
var userSchema = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/auth/signin", async function (req, res) {
  var user = await userSchema
    .findOne({ username: req.body.username })
    .catch((err) => {
      console.log(err);
    });

  if (req.body.username === "" || req.body.password === "") {
    res.send({ msg: "Input Field can't Be Empty ", success: false });
  }
  if (user) {
    var pass = user.password;
    // comapring using Bcrypt JS
    const password = await bcrypt.compare(req.body.password, pass);
    if (!password) {
      res.status(200).send({ msg: "Invalid Credentials", success: false });
    } else {
      const data = {
        user: user._id,
      };
      // set Expiration time in JWT Token
      const JWT_SECRET = "THISISTHEJSONWEBTOKENFORTHISBLOGAPPLICATION";
      const authtoken = jwt.sign(data, JWT_SECRET, { expiresIn: "24h" });
      res
        .status(200)
        .send({ msg: "Login Succesfully", authtoken, success: true });
    }
  } else {
    res.status(200).send({ msg: "Invalid Credentials", success: false });
    console.log("User not exist ");
  }
});

module.exports = router;
