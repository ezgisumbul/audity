'use strict';

const express = require('express');
const router = express.Router();

const Library = require('./../models/library');
const Sound = require('./../models/sound');
const Item = require('./../models/item');

router.get('/', (req, res, next) => {
  Library.find()
    .then((libraries) => {
      res.json({ libraries });
    })
    .catch((err) => next(err));
});

router.get('/list', (req, res, next) => {
  Library.find()
    .then((libraries) => {
      res.json({ libraries });
    })
    .catch((err) => next(err));
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Library.findById(id)
    .populate({
      path: 'item',
      populate: { path: 'owner', model: 'User' }
    })
    .then((library) => {
      res.json({ library });
    })
    .catch((err) => next(err));
});

router.post('/list', (req, res, next) => {
  const { title } = req.body;
  Library.create({ title, user: req.user._id }).then((library) =>
    res.json({ library })
  );
});

router.post('/:id', (req, res, next) => {
  const { id } = req.params;
  // console.log('id:' + id);
  const { soundToRemove } = req.body;
  // console.log(selectedLibraryName);
  // console.log(req.body);
  // Once the library id is passed, instead of create library per object
  // $push to the library array, Library.findOneAndUpdate(id)
  Library.findByIdAndUpdate(id, { $pull: { item: soundToRemove } })
    .then(() => {
      res.json({});
    })
    .catch((error) => {
      next(error);
    });
});

// Move to sound route

// router.post('/sound/:id/bookmark', (req, res, next) => {
//   const { id } = req.params;

//   Sound.findOneAndUpdate({ _id: id }, { ...sound });
// });

// router.delete('/sound/:id/bookmark', (req, res, next) => {});

module.exports = router;
