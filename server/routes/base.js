'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
const Sound = require('./../models/sound');

const Item = require('../models/item');

router.get('/', (req, res, next) => {
  // res.json({ type: 'success', data: { title: 'Hello World' } });
  console.log('HALLO');
  Sound.find().then((sounds) => {
    res.json({ sounds });
  });
});

router.get('/item', (req, res, next) => {
  Item.find().then((items) => {
    res.json({ items });
  });
});

router.post('/item', (req, res, next) => {
  // res.json({ type: 'success', data: { title: 'Hello World' } });
  const { name, owner } = req.body;
  Item.create({ name, owner }).then((item) => {
    res.json({ item });
  });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.json({});
});

module.exports = router;
