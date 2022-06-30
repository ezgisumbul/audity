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

  if (tags || quality) {
    // serach in case user searches on SerachSoundPage for sounds with specific tags/quality

    let tagsArray = tags.split(',');
    let qualityArray = quality.split(',');

    if (quality) {
      queryObj = {
        $and: [
          { published: true },
          { tags: { $in: tagsArray } },
          { quality: { $in: qualityArray } } // todo: change so that it is minimum this quality??
        ]
      };
    } else {
      queryObj = {
        $and: [{ published: true }, { tags: { $in: tagsArray } }]
      };
    }
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
    soundFile: 'test.mp3', // <--- for dev as long sound upload does not work
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
    soundFile,
    quality
  } = req.body;
  const owner = req.user._id;
  console.log(owner); // problem
  Sound.findByIdAndUpdate(
    { _id: id, owner },
    {
      title,
      description,
      tags,
      price,
      position,
      published,
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
  Sound.findByIdAndDelete(id)
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
