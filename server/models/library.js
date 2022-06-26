'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'User'
    // },
    // sound: [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'Sound'
    // }]
    title: {
      type: String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    item: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Item'
      }
    ]
  },
  { timestamps: true }
);

const Library = mongoose.model('Library', schema);

module.exports = Library;
