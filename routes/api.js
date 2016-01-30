var express = require('express');
var jwt = require('jsonwebtoken');
var bodyParser = require("body-parser");
var router = express.Router();

var config = require('../config');

var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));

var User = require('../models/user');
var Note = require('../models/note');

router.use(function(req, res, next) {
    //var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;
    var token = req.cookies.token;
    var userid = req.cookies.userid;
    if (token) {
        //Check token
        jwt.verify(token, config.secret+userid, function(err, decoded) {      
            if (err) { //Wrong token
                return res.json({ success: false, message: 'Failed to authenticate token.' });    
            }
            else {
                req.decoded = decoded;    
                next();
            }
        });
    }
    else {
        // Missing token
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
            res.send({
                message: err,
                success: false,
            });
        }
        res.json({
            message: "Get users",
            success: true,
            data: users,
        });
    });
});
router.post('/user', function(req, res, next) {
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
            user.password = req.body.password; //TODO Encrypt-Decrypt password
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
})

router.get('/note/:uid', function(req, res, next) {
    var uid = req.params.uid;
    console.log(uid);
    Note.find(
        {uid: uid},
        function(err, notes) {
            if (err){
                res.send({
                    message: err,
                    success: false,
                });
            }
            res.json({
                message: "Get notes",
                success: true,
                data: notes,
            });
    })
    .sort({date: -1});
});
router.post('/note', function(req, res, next) {
    var note = new Note();
    note.uid = req.body.uid;
    note.text = req.body.text;
    note.save(function(err) {
        if (err){
            res.send({
                message: err,
                success: false,
            });
        }
        res.json({
            message: 'Note created!',
            success: true,
        });
    });
})
module.exports = router;
