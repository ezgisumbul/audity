'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('./../models/user');
const { cloudinary } = require('./../utils/cloudinary');
const router = new Router();

router.post('/sign-up', (req, res, next) => {
  const { name, email, password, description, picture, sound } = req.body;

  const imgStr = picture;
  const soundStr = sound;

  if (imgStr) {
    cloudinary.uploader
      .upload(imgStr, { resource_type: 'image' })
      .then(() => {
        console.log('image upload succesfull');
      })
      .catch((error) => {
        next(error);
      });
  }

  if (soundStr) {
    cloudinary.uploader
      .upload(soundStr, { resource_type: 'video' })
      .then(() => {
        console.log('sound upload succesfull');
      })
      .catch((error) => {
        next(error);
      });
  }

  bcryptjs
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        name,
        email,
        passwordHashAndSalt: hash,
        description,
        picture,
        sound
      });
    })
    .then((user) => {
      req.session.userId = user._id;
      res.json({ user });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/sign-in', (req, res, next) => {
  let user;
  const { email, password } = req.body;
  User.findOne({ email })
    .then((document) => {
      if (!document) {
        res.json({ message: 'There is no user with that email.' });
        return Promise.reject(new Error("There's no user with that email."));
      } else {
        user = document;
        return bcryptjs.compare(password, user.passwordHashAndSalt);
      }
    })
    .then((result) => {
      if (result) {
        req.session.userId = user._id;
        res.json({ user });
      } else {
        res.json({ message: 'There is no user with that email.' });
        return Promise.reject(new Error('Wrong password.'));
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.json({});
});

router.get('/me', (req, res, next) => {
  res.json({ user: req.user });
});

module.exports = router;
