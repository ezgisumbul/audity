'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({});

const Item = mongoose.model('Item', schema);

module.exports = Item;
