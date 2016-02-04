var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.statusCode = 302; 
    res.setHeader("Location", "/login");
    res.end();
});

module.exports = router;
