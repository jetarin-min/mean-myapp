var express = require('express');
var bodyParser = require("body-parser");
var router = express.Router();

var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));

/* GET home page. */
router.post('/', function(req, res, next) {
    var body = req.body;
    if (body.method == 'execute') {
        console.log("RPC EXECUTE=============");
        var model = body.params[0]
        var method = body.params[1]
        var args = body.params[2]
        console.log("Model: "+model+"| Method: "+ method +"| Args: "+args);
    }
});

module.exports = router;
