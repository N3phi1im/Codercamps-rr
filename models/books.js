'use strict';
var mongoose = require('mongoose');
var BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publish: { type: Number, min: 0, required: true },
    genre: { type: String, required: true }
});
exports.Book = mongoose.model('Book', BookSchema);
