var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var helmet = require('helmet');

var account = require('./routes/account');
var rest = require('./routes/rest');
var authentification = require('./routes/authentification');

var app = express();

app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(reg,res,next){
    setTimeout(next, 50);
});

app.use('/api/0.0.1/account', account);
app.use('/api/0.0.1/rest', rest);
app.use('/api/0.0.1/authentification', authentification);
app.use(express.static(path.join(__dirname, '..', 'public')));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // var err = new Error('Not Found');
  // err.status = 404;
  // next(err);
  request.get('/new', function(err, response, body) {
    if (!err) {
      req.send(body);
    }
  });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
