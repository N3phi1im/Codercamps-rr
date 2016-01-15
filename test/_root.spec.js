"use strict";
process.env.NODE_ENV = "test";
let server = require('../server');
let async = require('async');
let mongoose = require('mongoose');
let Book = mongoose.model('Book');

// clear out the database before running the tests!!
before((done) => {
  async.parallel([
    (cb) => {
      Book.collection.remove(cb);
    },
    (cb) => {
      // other database remove like the example above...
      cb();
    }
  ], done);
});
