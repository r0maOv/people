var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');
var sass         = require('node-sass');

// routes paths
var langRoute = require('./routes/language');
var eduRoute  = require('./routes/education');
var pplRoute  = require('./routes/people');

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

var app = express();

app.set('views', path.join(__dirname, 'public', 'views'));

// app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower', express.static(path.join(__dirname, '/bower_components')));

// routes
app.use('/api/languages', langRoute);
app.use('/api/education', eduRoute);
app.use('/api/people', pplRoute);

// partials definition
app.use('/partials/:param', function (req, res) {
    var filename = req.params.param;
    res.sendFile(path.join(__dirname, '/public/views/partials/', filename));
});

// redirect all unknown urls to the main page
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.on('foo', function () {
    console.log('foo emited');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
