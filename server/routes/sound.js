'use strict';

const { Router } = require('express');
const Library = require('../models/library');
const Sound = require('./../models/sound');
const { cloudinary } = require('./../utils/cloudinary');

const router = new Router();

router.get('/list', (req, res, next) => {
  Sound.find()
    .then((sounds) => {
      res.json({ data: sounds });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/search', (req, res, next) => {
  const { tags, quality } = req.query;
  let queryObj = {};

  if (req.user) {
    queryObj = {
      $and: [
        { published: true },
        //{ owner: { $ne: { _id: req.user.id } } },
        { tags: { $in: tags } },
        { quality } // todo: change so that it is minimum this quality
      ]
    };
  } else {
    queryObj = {
      $and: [
        { published: true },
        { tags: { $in: tags } },
        { quality } // to do: change so that it is minimum this quality
      ]
    };
  }

  Sound.find(queryObj)
    .sort({ createdAt: -1 })
    .populate('owner')
    .then((sounds) => {
      res.json({ data: sounds });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/create', (req, res, next) => {
  const {
    title,
    description,
    tags,
    price,
    position,
    published,
    soundFile,
    quality
  } = req.body;

  // const fileStr = soundFile; // <-- works: there is this long file string stored in sound File
  // console.log(req.body); // <-- undefined - why? when i console loged the str it starts with: 'data:audio/mpeg;base64....'

  // cloudinary.uploader
  //   .upload(fileStr, { resource_type: 'video' })
  //   .then((sound) => {
  //     console.log(sound);
  //   })
  //   .catch((error) => {
  //     next(error);
  //   });

  Sound.create({
    title,
    description,
    tags,
    price,
    position,
    published,
    owner: req.user._id,
    soundFile,
    quality
  })
    .then((sound) => {
      res.json({ sound });
    })
    .catch((error) => {
      next(error);
    });
});

router.patch('/:id/edit', (req, res, next) => {
  const { id } = req.params;
  const {
    title,
    description,
    tags,
    price,
    position,
    published,
    owner,
    soundFile,
    quality
  } = req.body;
  Sound.findByIdAndUpdate(
    { _id: id, owner },
    {
      title,
      description,
      tags,
      price,
      position,
      published,
      owner,
      soundFile,
      quality
    },
    { new: true }
  )
    .then((sound) => {
      res.json({ sound });
    })
    .catch((error) => {
      next(error);
    });
});

router.delete('/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Pet.findByIdAndDelete(id)
    .then(() => {
      res.json({});
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Sound.findById(id)
    .populate('owner')
    .then((sound) => {
      res.json({ sound });
    })
    .catch((error) => {
      next(error);
    });
});

// router.post('/:id/bookmark', (req, res, next) => {
//   const { id } = req.params;

//   Library.findOne({ sound: id }).then((sound) => {
//     if (!sound) {
//     }
//   });
// });

// router.delete('/:id/bookmark', (req, res, next) => {});

module.exports = router;
