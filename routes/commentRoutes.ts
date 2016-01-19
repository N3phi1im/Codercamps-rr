"use strict";
import express = require('express');
import jwt = require('express-jwt');
let mongoose = require('mongoose');

let router = express.Router();
let User = mongoose.model('User');
let Book = mongoose.model('Book');
let Comment = mongoose.model('Comment');

let auth = jwt({
  secret: 'SecretKey',
  userProperty: 'payload'
});

// POST: /api/comments
router.post('/', auth, (req, res, next) => {
  // Check that the book actually exists before saving the comment
  Book.findOne({ _id: req.body.book }).exec((err, book) => {
    if (err) return next(err);
    if (!book) return next({ status: 404, message: "Book could not be found." });
    // next no params -- go to the next route, post: /api/comments
    req['book'] = book;
    next();
  });
});

// POST: /api/comments -- Book Exists && User Logged In
router.post('/', (req, res, next) => {
  // create the comment object
  let comment = new Comment(req.body);
  comment.created = Date.now();
  comment.deleted = null;
  comment.createdBy = req['payload']._id;
  comment.createdByEmail = req['payload'].email;
  comment.createdByUsername = req['payload'].username;
  comment.save((err, c) => {
    if (err) return next(err);
    if (!c) return next({ message: 'Error saving comment.' });
    // push this comment into the book we found in the route above, and save that book
    req['book'].comments.push(c._id);
    req['book'].save();
    // push this comment into the logged in user
    User.update({ _id: req['payload']._id }, { $push: { comments: c._id }}, (err, result) => {
      if (err) return next(err);
      // populate the user information on the comment
      c.populate('createdBy', 'email username', (err, com) => {
        // return the saved comment back to the user
        res.send(c);
      });
    });
  });
});

// DELETE: /api/comments/:id
router.delete('/:id', auth, (req, res, next) => {
  Comment.update({ _id: req.params.id }, { deleted: Date.now() }, (err, result) => {
    if (err) return next(err);
    res.send({ message: 'Deleted the comment.' });
  });
});

export = router;
