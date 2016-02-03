var express = require('express');
var bodyParser = require("body-parser");
var router = express.Router();

var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));

var Contact = require('../models/simple_contact');

//User
router.get('/contact', function(req, res, next) {
    Contact.find(function(err, users) {
        if (err){
            res.send({
                message: err.message,
                success: false,
            });
        }
        else{
            res.json({
                message: "Get contact",
                success: true,
                data: users,
            });
        }
    });
});
router.post('/contact', function(req, res, next) {
    var contact = new Contact();
    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    contact.save(function(err) {
        if (err){
            res.send({
                message: err.message,
                success: false,
            });
        }
        else{
            res.json({
                message: 'Contact created!',
                success: true,
            });
        }
    });
});
module.exports = router;
