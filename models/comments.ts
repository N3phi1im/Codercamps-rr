"use strict";
import mongoose = require('mongoose');

let CommentSchema = new mongoose.Schema({
  message: { type: String, required: true },
  created: { type: Number, default: Date.now },
  deleted: { type: Number, default: null },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdByEmail: String,
  createdByUsername: String
});

export let Comment = mongoose.model('Comment', CommentSchema);
