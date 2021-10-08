var express = require('express')
var router = express.Router();


router.post('/auth/signup', function(req, res) {
    console.log(req.body);
})

module.exports = router