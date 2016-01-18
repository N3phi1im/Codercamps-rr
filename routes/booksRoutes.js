"use strict";
var express = require("express");
var jwt = require('express-jwt');
var mongoose = require("mongoose");
var router = express.Router();
var Book = mongoose.model("Book");
var User = mongoose.model('User');
var auth = jwt({
    userProperty: 'payload',
    secret: 'SecretKey'
});
router.get("/", function (req, res, next) {
    Book.find({})
        .exec(function (err, books) {
        if (err)
            return next(err);
        res.json(books);
    });
});
router.get('/:id', function (req, res, next) {
    Book.findOne({ _id: req.params.id })
        .populate('createdBy', 'username email')
        .exec(function (err, book) {
        if (err)
            return next(err);
        if (!book)
            return next({ message: 'Could not find your book.' });
        res.send(book);
    });
});
router.post("/", auth, function (req, res, next) {
    var newBook = new Book(req.body);
    newBook.createdBy = req['payload']._id;
    newBook.save(function (err, book) {
        if (err)
            return next(err);
        User.update({ _id: req['payload']._id }, { $push: { 'books': book._id } }, function (err, result) {
            if (err)
                return next(err);
            res.send(book);
        });
    });
});
router.put("/:_id", function (req, res, next) {
    Book.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true }, function (err, result) {
        if (err)
            return next(err);
        if (!result)
            return next({ message: 'Could not find and update the book.' });
        res.send(result);
    });
});
router.delete("/", function (req, res, next) {
    if (!req.query._id)
        return next({ status: 404, message: 'Please include an ID ' });
    Book.remove({ _id: req.query._id }, function (err, result) {
        res.send({ message: "SUCCESSSS!YAAAY" });
    });
});
module.exports = router;
