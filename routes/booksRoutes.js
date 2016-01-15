"use strict";
var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var Book = mongoose.model("Book");
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
        .exec(function (err, book) {
        if (err)
            return next(err);
        if (!book)
            return next({ message: 'Could not find your book.' });
        res.send(book);
    });
});
router.post("/", function (req, res, next) {
    var newBook = new Book(req.body);
    newBook.save(function (err, book) {
        if (err)
            return next(err);
        res.send(book);
    });
});
router.delete("/", function (req, res, next) {
    Book.remove({ _id: req.query._id }, function (err, result) {
        res.send({ message: "SUCCESSSS!YAAAY" });
    });
});
router.put("/:_id", function (req, res, next) {
    Book.findOneAndUpdate({ _id: req.params._id }, req.body, function (err, result) {
        if (err)
            return next(err);
        if (!result)
            return next({ message: 'Could not find and update the book.' });
        res.send(result);
    });
});
module.exports = router;
