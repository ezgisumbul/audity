'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    sound: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Sound'
      }
    ]
    //, item: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Item'
    //   }
    // ]
  },
  { timestamps: true }
);

const Library = mongoose.model('Library', schema);

module.exports = Library;
