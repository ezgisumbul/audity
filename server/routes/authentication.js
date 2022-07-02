'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('./../models/user');
const { cloudinary } = require('./../utils/cloudinary');
const router = new Router();

router.post('/sign-up', (req, res, next) => {
  console.log('REQ body', req.body);
  const { name, email, password, description, picture, sound } = req.body;

  const imgStr = picture; // <-- works: there is this long file string stored in sound File
  const soundStr = sound;

  cloudinary.uploader
    .upload(imgStr, { resource_type: 'image' })
    .then(() => {
      console.log('image upload succesfull');
    })
    .catch((error) => {
      next(error);
    });

  cloudinary.uploader
    .upload(soundStr, { resource_type: 'video' })
    .then(() => {
      console.log('sound upload succesfull');
    })
    .catch((error) => {
      next(error);
    });

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
