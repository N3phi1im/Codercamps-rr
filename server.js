"use strict";
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var app = express();
var mongoose = require('mongoose');
require('./models/users');
require("./models/books");
require('./models/comments');
require('./config/passport');
if (process.env.NODE_ENV === 'test')
    mongoose.connect("mongodb://localhost/bookStore-test");
else
    mongoose.connect("mongodb://localhost/bookStore");
app.set('views', './views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
if (process.env.NODE_ENV !== 'test')
    app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
var bookRoutes = require("./routes/booksRoutes");
var userRoutes = require('./routes/userRoutes');
var commentRoutes = require('./routes/commentRoutes');
app.use("/books", bookRoutes);
app.use('/users', userRoutes);
app.use('/api/comments', commentRoutes);
app.use(express.static('./public'));
app.use('/scripts', express.static('bower_components'));
app.get('/*', function (req, res, next) {
    if (/.js|.html|.css|templates|javascript/.test(req.path))
        return next({ status: 404, message: 'Not Found' });
    if (/application\/json/.test(req.get('accept'))) {
        return next({ status: 404, message: 'Not Found' });
    }
    else {
        return res.render('index');
    }
});
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    if (err.name = 'CastError')
        err.message = 'Invalid ID';
    var error = (app.get('env') === 'development') ? err : {};
    res.send({
        message: err.message,
        error: error
    });
});
module.exports = app;
