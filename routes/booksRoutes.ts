"use strict";

import express = require("express");
import jwt = require('express-jwt');
let mongoose = require("mongoose");
let router = express.Router();
let Book = mongoose.model("Book");
let User = mongoose.model('User');
let auth = jwt({
  // where we find the JWT information
  // use it as req.payload.propertyname
  userProperty: 'payload',
  // secret must match the one on the User model, in the genJWT()
  secret: 'SecretKey'
});

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
    .populate('createdBy', 'username email')
    .exec((err, book) => {
    if (err) return next(err);
    if (!book) return next({ message: 'Could not find your book.' });
    res.send(book);
  });
});

// POST: /books
router.post("/", auth, (req, res, next) => {
  let newBook = new Book(req.body);
  newBook.createdBy = req['payload']._id;
  newBook.save((err, book) => {
    if (err) return next(err);
    User.update({ _id: req['payload']._id }, { $push: { 'books': book._id } }, (err, result) => {
      if (err) return next(err);
      res.send(book);
    });
  });
});

// PUT: /books/:_id
router.put("/:_id", (req, res, next) => {
  // ( findBy, updateWith, callback )
  Book.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true }, (err, result) => {
    if (err) return next(err);
    if (!result) return next({ message: 'Could not find and update the book.' });
    res.send(result);
  });
});

// DELETE: /books?_id={{book_id}}
router.delete("/", (req, res, next) => {
  if (!req.query._id) return next({ status: 404, message: 'Please include an ID '});
  Book.remove({ _id: req.query._id }, (err, result) => {
    res.send({ message: "SUCCESSSS!YAAAY" });
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
