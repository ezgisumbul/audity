'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
const User = require('./../models/user');
const Sound = require('./../models/sound');
const Follow = require('./../models/follow');

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

// Following

// - GET - `/profile/:id/followed` - List all users that this user follow
router.get('/:id/followed', routeGuard, (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  Follow.find({ follower: id })
    .populate('followed')
    .then((documents) => {
      const followed = documents.map((doc) => doc.followed);
      res.json({ followed });
    })
    .catch((error) => {
      next(error);
    });
});

// - GET - '/profile/follower' - List all users that following this user
router.get('/:id/follower', routeGuard, (req, res, next) => {
  const { id } = req.params;
  Follow.find({ followed: id })
    .populate('follower')
    .then((documents) => {
      const follower = documents.map((doc) => doc.follower);
      res.json({ follower });
    })
    .catch((error) => {
      next(error);
    });
});

// - POST - '/profile/:id/follow' - Set bookmark for this house on this users profile.
router.post('/:id/follow', routeGuard, (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  /* Avoids creating a duplicate follow document */
  Follow.findOne({ followed: id, follower: userId })
    .then((document) => {
      if (!document) {
        return Follow.create({ followed: id, follower: userId });
      }
    })
    .then(() => {
      res.json({});
    })
    .catch((error) => {
      next(error);
    });
});

//   // - DELETE - '/profile/:id/unfollow' - Unset bookmark for this house on this users profile.
router.delete('/:id/unfollow', routeGuard, (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  Follow.findOneAndDelete({ follower: userId, followed: id })
    .then(() => {
      res.json({});
    })
    .catch((error) => {
      next(error);
    });
});

/// router.get('/following') - MISSING ROUTE

module.exports = router;
