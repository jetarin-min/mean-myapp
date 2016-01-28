var express = require('express');
var jwt = require('jsonwebtoken');
var bodyParser = require("body-parser");
var router = express.Router();

var config = require('../config');

var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));

/* GET home page. */

var User = require('../models/user');

router.use(function(req, res, next) {
    //var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;
    var token = req.cookies.token;
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secret, function(err, decoded) {      
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });    
            }
            else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;    
                next();
            }
        });
    }
    else {
        // if there is no token
        // return an error
        /*
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
        */
        res.json({
            success: false, 
            message: 'No token provided.' 
        });
    }
});

router.get('/user', function(req, res, next) {
    User.find(function(err, users) {
        if (err){
            res.send(err);
        }

        res.json(users);
        console.log(users);
    });
})
.post('/user', function(req, res, next) {
    User.findOne({
        username: req.body.username,
    }, function(err, user) {
        if(user){
            res.json({
                message: 'User is already existed!',
                success: false,
            });
        }
        else{
            var user = new User();
            user.username = req.body.username;
            user.password = req.body.password;
            user.admin = true;
            user.save(function(err) {
                if (err){
                    res.send(err);
                }
                res.json({
                    message: 'User created!',
                    success: true,
                });
            });
        }
    });
});

module.exports = router;
