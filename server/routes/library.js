'use strict';

const express = require('express');
const router = express.Router();

const Library = require('./../models/library');

router.get('/', (req, res, next) => {
  Library.find()
    .then((libraries) => {
      res.json({ libraries });
    })
    .catch((err) => next(err));
});
router.get('/library/:id', (req, res, next) => {
  const { id } = req.params;
  Library.findById(id)
    .then((library) => {
      res.json({ library });
    })
    .catch((err) => next(err));
});

// Move to sound route

// router.post('/sound/:id/bookmark', (req, res, next) => {
//   const { id } = req.params;

//   Sound.findOneAndUpdate({ _id: id }, { ...sound });
// });

// router.delete('/sound/:id/bookmark', (req, res, next) => {});

module.exports = router;
