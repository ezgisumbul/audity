'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 36
    },

    description: {
      type: String,
      trim: true,
      maxlength: 400
    },

    tags: [
      {
        type: String,
        enum: [
          'city',
          'street',
          'traffic',
          'capital',
          'urban',
          'animal',
          'wind',
          'water',
          'weather',
          'announces',
          'loud',
          'quiet',
          'noisy',
          'artificial',
          'melodic',
          'funny',
          'rare',
          'nature',
          'strange',
          'voices',
          'atmospheric',
          'high pitched',
          'echo',
          'deep',
          'pure'
        ]
      }
    ],

    price: {
      type: Number,
      required: true,
      min: 0
    },

    position: {
      type: String,
      default: 'Point',
      coordinates: [Number]
    },

    published: {
      type: Boolean,
      required: true
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    soundFile: {
      type: String,
      required: true
    },

    quality: {
      type: String,
      enum: ['high', 'medium', 'low'],
      required: true
    }
  },
  { timestamps: true }
);

const Sound = mongoose.model('Sound', schema);

module.exports = Sound;
