'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
const Sound = require('./../models/sound');

const Item = require('../models/item');
const Library = require('./../models/library');

router.get('/', (req, res, next) => {
  // res.json({ type: 'success', data: { title: 'Hello World' } });
  console.log('HALLO');
  Sound.find().then((sounds) => {
    res.json({ sounds });
  });
});

router.get('/item/:id', (req, res, next) => {
  const { id } = req.params;
  Item.findById(id).then((item) => {
    res.json({ item });
  });
});

router.post('/item', (req, res, next) => {
  // res.json({ type: 'success', data: { title: 'Hello World' } });
  const { name } = req.body;
  Item.create({ name, owner: req.user._id }).then((item) => res.json({ item }));
});

router.post('/:id/bookmark', (req, res, next) => {
  // res.json({ type: 'success', data: { title: 'Hello World' } });
  const { id } = req.params;
  Library.findOne({ item: id })
    .then((result) => {
      if (!result) {
        // maybe not create but rather push to the library list
        return Library.create({ item: id, user: req.user._id });
      }
      // else {
      //   // the button should be remove in this case
      // }

      console.log(result);
    })
    .then(() => {
      res.json({});
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.json({});
});

module.exports = router;
