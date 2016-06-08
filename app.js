var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');
var sass         = require('node-sass');

// SASS init
sass.render({
    file: __dirname + '/public/stylesheets/style.sass',
    outFile: __dirname + '/public/stylesheets/style.css',
    outputStyle: 'expanded'
}, function(error) {
    if (error) 
        console.log("Error message: ", error.message, ". Line no: ", error.line);
});

// mongoose init
mongoose.connect('mongodb://localhost/people');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
require('./models/language');

var app = express();

app.set('views', path.join(__dirname, 'public', 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower', express.static(path.join(__dirname, '/bower_components')));

// routes
app.use('/api/languages', require('./routes/language'));
app.use('/api/education', require('./routes/education'));

app.use('/partials/:param', function (req, res) {
    var filename = req.params.param;
    res.sendFile(path.join(__dirname, '/public/views/partials/', filename));
});

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

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
