var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to mongo DB
var config = require('./config');
mongoose.connect(config.database);

var routes = require('./routes/index');
var ui = require('./routes/ui');
var api = require('./routes/api');
var authen = require('./routes/authen');

//Simple
var simple_ui = require('./routes/simple_ui');
var simple_api = require('./routes/simple_api');

var app = express();

var socketserver = app.listen(3009);
var io = require('socket.io').listen(socketserver);

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('send-text', function(text) {
        console.log(text);
        io.emit('broadcast-text', {
            message: text,
        });
    });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/ui', ui);
app.use('/api', api);
app.use('/authen', authen);
//Simple
app.use('/simple_ui', simple_ui);
app.use('/simple_api', simple_api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
