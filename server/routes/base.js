'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
const Sound = require('./../models/sound');

const Item = require('../models/item');
const Library = require('./../models/library');

// router.get('/', (req, res, next) => {
//   // res.json({ type: 'success', data: { title: 'Hello World' } });
//   console.log('HALLO');
//   Sound.find().then((sounds) => {
//     res.json({ sounds });
//   });
// });

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

// Here instead of create we will have push to library array. we need library id.
// we should get it through select options (either name or id)
// and pass it to params maybe on select?
// I don't know how else can we access the selected library's id
// in the backend
router.post('/:id/bookmark', (req, res, next) => {
  const { id } = req.params;
  // console.log('id:' + id);
  const { selectedLibraryName } = req.body;
  // console.log(selectedLibraryName);
  // console.log(req.body);
  // Once the library id is passed, instead of create library per object
  // $push to the library array, Library.findOneAndUpdate(id)
  Library.findOneAndUpdate(
    { title: selectedLibraryName, user: req.user._id },
    { $push: { item: id } }
  )
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
