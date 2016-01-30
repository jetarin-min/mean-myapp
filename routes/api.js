var express = require('express');
var jwt = require('jsonwebtoken');
var bodyParser = require("body-parser");
var router = express.Router();

var config = require('../config');

var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));

var User = require('../models/user');
var Note = require('../models/note');
var Product = require('../models/product');

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
//User
router.get('/user', function(req, res, next) {
    User.find(function(err, users) {
        if (err){
            res.send({
                message: err.message,
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
    /*
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
    */
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password; //TODO Encrypt-Decrypt password
    user.save(function(err) {
        if (err){
            console.log("#############");
            console.log(err);
            console.log("#############");
            res.send({
                message: err.message,
                success: false,
            });
        }
        res.json({
            message: 'User created!',
            success: true,
        });
    });
})
//Note
router.get('/note/:uid', function(req, res, next) {
    var uid = req.params.uid;
    console.log(uid);
    Note.find(
        {uid: uid},
        function(err, notes) {
            if (err){
                res.send({
                    message: err.message,
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
            console.log("#############");
            console.log(err);
            console.log("#############");
            res.send({
                message: err.message,
                success: false,
            });
        }
        res.json({
            message: 'Note created!',
            success: true,
        });
    });
})
//Product
router.get('/product', function(req, res, next) {
    Product.find(
        function(err, products) {
            if (err){
                res.send({
                    message: err.message,
                    success: false,
                });
            }
            res.json({
                message: "Get product",
                success: true,
                data: products,
            });
    })
    .sort({code: 1});
});
router.get('/product/:id', function(req, res, next) {
    var id = req.params.id
    Product.findOne(
        {_id: id}, 
        function(err, products) {
            if (err){
                res.send({
                    message: err.message,
                    success: false,
                });
            }
            res.json({
                message: "Get product",
                success: true,
                data: products,
            });
    });
});
router.post('/product', function(req, res, next) {
    var product = new Product();
    product.name = req.body.name;
    product.code = req.body.code;
    product.price = req.body.price;
    console.log(product.name);
    product.save(function(err) {
        if (err){
            console.log("#############");
            console.log(err);
            console.log("#############");
            res.send({
                message: err.message,
                success: false,
            });
        }
        res.json({
            message: 'Product created!',
            success: true,
        });
    });
})
router.delete('/product/:id', function(req, res, next) {
    var id = req.params.id; 
    console.log("ID:"+id);
    Product.remove(
        {_id: id},
        function(err) {
            if (err){
                console.log("#############");
                console.log(err);
                console.log("#############");
                res.send({
                    message: err.message,
                    success: false,
                });
            }
            res.json({
                message: 'Product Deleted!',
                success: true,
            });
    });
})
router.put('/product/:id', function(req, res, next) {
    var id = req.params.id; 
    console.log("Edit ID:"+id);
    console.log(req.body);
    Product.findOneAndUpdate(
        {_id: id},
        req.body,
        function(err) {
            if (err){
                console.log("#############");
                console.log(err);
                console.log("#############");
                res.send({
                    message: err.message,
                    success: false,
                });
            }
            res.json({
                message: 'Product Edited!',
                success: true,
            });
    });
})
module.exports = router;
