'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
const User = require('./../models/user');
const Sound = require('./../models/sound');

// I think we should rename "profile" object here to "user" for consistency
// throughout the app. This will also affect the ProfilePage, ProfileEdit,
// maybe renaming the service as well but not necessarily.

router.get('/search', (req, res, next) => {
  const { term } = req.query;

  User.find({ name: { $regex: new RegExp(term, 'i') } })
    .then((users) => {
      res.json({ profiles: users });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:id', routeGuard, (req, res, next) => {
  const { id } = req.params;
  let user;
  User.findById(id)
    .then((document) => {
      user = document;
      return Sound.find({ owner: id }).populate('owner');
    })
    .then((sounds) => {
      res.json({ profile: user, sounds });
    })
    .catch((error) => {
      next(error);
    });
});

router.patch('/', routeGuard, (req, res, next) => {
  const { name, email, description, picture, sound } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email, description, picture, sound },
    { new: true }
  )
    .then((user) => {
      res.json({ profile: user });
    })
    .catch((error) => {
      next(error);
    });
});

/// router.get('/following') - MISSING ROUTE

module.exports = router;
