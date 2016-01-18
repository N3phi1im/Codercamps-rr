"use strict";
var express = require('express');
var jwt = require('express-jwt');
var mongoose = require('mongoose');
var router = express.Router();
var User = mongoose.model('User');
var Book = mongoose.model('Book');
var Comment = mongoose.model('Comment');
var auth = jwt({
    secret: 'SecretKey',
    userProperty: 'payload'
});
router.post('/', auth, function (req, res, next) {
    Book.findOne({ _id: req.body.book }).exec(function (err, book) {
        if (err)
            return next(err);
        if (!book)
            return next({ status: 404, message: "Book could not be found." });
        req['book'] = book;
        next();
    });
});
router.post('/', function (req, res, next) {
    var comment = new Comment(req.body);
    comment.created = Date.now();
    comment.deleted = null;
    comment.createdBy = req['payload']._id;
    comment.createdByEmail = req['payload'].email;
    comment.createdByUsername = req['payload'].username;
    comment.save(function (err, c) {
        if (err)
            return next(err);
        if (!c)
            return next({ message: 'Error saving comment.' });
        req['book'].comments.push(c._id);
        req['book'].save();
        User.update({ _id: req['payload']._id }, { $push: { comments: c._id } }, function (err, result) {
            if (err)
                return next(err);
            c.populate('createdBy', 'email username', function (err, com) {
                res.send(c);
            });
        });
    });
});
module.exports = router;
