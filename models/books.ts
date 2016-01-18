'use strict';

import mongoose = require('mongoose');
let BookSchema = new mongoose.Schema({

  title: { type: String, required: true },
  author: { type: String, required: true },
  publish: { type: Number, min: 0, required: true },
  genre: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  // createdBy: {
  //   username: String,
  //   email: String,
  //   passwordHash: String
  // }
});



export let Book = mongoose.model('Book', BookSchema);
