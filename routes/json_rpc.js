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
        var model_name = body.params[0]
        var method = body.params[1]
        var args = body.params[2]
        console.log("Model: "+model_name+"| Method: "+ method +"| Args: "+args);

        var model = require("../models/"+model_name);
        model.show_all_user();
    }
});

module.exports = router;
