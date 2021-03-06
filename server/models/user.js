'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    passwordHashAndSalt: {
      type: String,
      required: true
    },
    description: {
      type: String,
      maxlength: 400
    },
    picture: {
      type: String
    },
    sound: {
      type: String
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User', schema);

module.exports = User;
