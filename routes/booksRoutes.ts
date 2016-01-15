"use strict";

import express = require("express");
let mongoose = require("mongoose");
let router = express.Router();
let Book = mongoose.model("Book");

// GET: /books
router.get("/", (req, res, next) => {
  Book.find({})
    .exec((err, books) => {
    if (err) return next(err);
    res.json(books);
  });
});

// GET: /books/:id
router.get('/:id', (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .exec((err, book) => {
      if (err) return next(err);
      if (!book) return next({ message: 'Could not find your book.' });
      res.send(book);
  });
});

// POST: /books
router.post("/", (req, res, next) => {
  let newBook = new Book(req.body);
  newBook.save((err, book) => {
    if (err) return next(err);
    res.send(book);
  });
});

// DELETE: /books?_id={{book_id}}
router.delete("/", (req, res, next) => {
  Book.remove({ _id: req.query._id }, (err, result) => {
    res.send({ message: "SUCCESSSS!YAAAY" });
  });
});

// PUT: /books/:_id
router.put("/:_id", (req, res, next) => {
  // ( findBy, updateWith, callback )
  Book.findOneAndUpdate({ _id: req.params._id }, req.body, (err, result) => {
    if (err) return next(err);
    if (!result) return next({ message: 'Could not find and update the book.' });
    res.send(result);
  });
});

export = router;

// QUERY Example
// /books?_id=58&title=GOT&genre=history
//
// Route PARAMS Example
// /books/:_id/:title/:genre => /books/58/GOT/history
//
// {
//  _id: 58,
//  title: GOT,
//  genre: history
// }
