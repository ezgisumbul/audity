'use strict';

const express = require('express');
const router = express.Router();

const Library = require('./../models/library');
const routeGuard = require('../middleware/route-guard');

router.get('/:userId/list', (req, res, next) => {
  if (req.user) {
    Library.find({ user: String(req.params.userId) })
      .populate('sound')
      .then((libraries) => {
        res.json({ libraries });
      })
      .catch((err) => next(err));
  }
});

router.get('/:userId/my-libraries', routeGuard, (req, res, next) => {
  if (req.user) {
    Library.find({ user: String(req.params.userId) })
      .populate('sound')
      .then((libraries) => {
        res.json({ libraries });
      })
      .catch((err) => next(err));
  }
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Library.findById(id)
    .populate({
      path: 'sound',
      populate: { path: 'owner', model: 'User' }
    })
    .then((library) => {
      res.json({ library });
    })
    .catch((err) => next(err));
});

router.post('/create', routeGuard, (req, res, next) => {
  const { title } = req.body;

  Library.create({ title, user: req.user._id }).then((library) =>
    res.json({ library })
  );
});

router.patch('/my-libraries', routeGuard, (req, res, next) => {
  // const { id } = req.params;
  const { id, soundToRemove } = req.body;

  Library.findByIdAndUpdate(
    id,
    { $pull: { sound: soundToRemove } },
    { new: true }
  )
    .then((library) => {
      res.json({ library });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

router.delete('/:id', routeGuard, (req, res, next) => {
  const { id } = req.params;

  Library.findOneAndDelete({ _id: id, user: req.user._id }, { new: true })
    .then((result) => {
      console.log('deletion result backend', result);
      res.json({});
    })
    .catch((error) => {
      next(error);
    });
});

router.patch('/:id', routeGuard, (req, res, next) => {
  const { id } = req.params;
  const { title } = req.body;

  Library.findByIdAndUpdate({ _id: id }, { title }, { new: true })
    .then((library) => {
      res.json({ library });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

module.exports = router;
