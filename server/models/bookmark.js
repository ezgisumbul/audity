'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  sound: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Sound'
  },
},
{ timestamps: true }
);

const Bookmark = mongoose.model('Bookmark', schema);

module.exports = Bookmark;