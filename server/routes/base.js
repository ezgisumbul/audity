'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
const Sound = require('./../models/sound');

router.get('/', (req, res, next) => {
  // res.json({ type: 'success', data: { title: 'Hello World' } });
  console.log('HALLO');
  Sound.find().then((sounds) => {
    res.json({ sounds });
  });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.json({});
});

module.exports = router;
