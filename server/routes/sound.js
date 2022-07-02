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
  const { term, tags, quality } = req.query;

  let queryObj = {};

  let tagsArray = tags.split(',');
  let qualityArray = quality.split(',');

  if (quality && tags && term) {
    queryObj = {
      $and: [
        { published: true },
        { tags: { $in: tagsArray } },
        { quality: { $in: qualityArray } },
        {
          $or: [
            { title: { $regex: new RegExp(term, 'i') } },
            { description: { $regex: new RegExp(term, 'i') } }
          ]
        }
      ]
    };
  } else if (quality && tags) {
    queryObj = {
      $and: [
        { published: true },
        { tags: { $in: tagsArray } },
        { quality: { $in: qualityArray } }
      ]
    };
  } else if (quality && term) {
    queryObj = {
      $and: [
        { published: true },
        { quality: { $in: qualityArray } },
        {
          $or: [
            { title: { $regex: new RegExp(term, 'i') } },
            { description: { $regex: new RegExp(term, 'i') } }
          ]
        }
      ]
    };
  } else if (tags && term) {
    queryObj = {
      $and: [
        { published: true },
        { tags: { $in: tagsArray } },
        {
          $or: [
            { title: { $regex: new RegExp(term, 'i') } },
            { description: { $regex: new RegExp(term, 'i') } }
          ]
        }
      ]
    };
  } else if (term) {
    queryObj = {
      $and: [
        { published: true },
        {
          $or: [
            { title: { $regex: new RegExp(term, 'i') } },
            { description: { $regex: new RegExp(term, 'i') } }
          ]
        }
      ]
    };
  } else if (tags) {
    queryObj = {
      $and: [{ published: true }, { tags: { $in: tagsArray } }]
    };
  } else {
    queryObj = {
      $and: [{ published: true }, { quality: { $in: qualityArray } }]
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
  // console.log('REQ body', req.body);
  const {
    title,
    description,
    tags,
    price,
    position,
    published,
    soundFile,
    quality,
    recordedAt
  } = req.body;

  const fileStr = soundFile; // <-- works: there is this long file string stored in sound File

  console.log('FileString before transform', soundFile, 'here');

  cloudinary.uploader
    .upload(fileStr, { resource_type: 'video' })
    .then((sound) => {
      console.log('soundupload succesfull');
    })
    .catch((error) => {
      next(error);
    });

  Sound.create({
    title,
    description,
    tags,
    price,
    position,
    published,
    owner: req.user._id,
    soundFile, // <--- for dev as long sound upload does not work
    quality,
    recordedAt
  })
    .then((sound) => {
      console.log(sound);
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
    quality,
    recordedAt
  } = req.body;
  const owner = req.user._id;

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
      quality,
      recordedAt
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

router.post('/:id/bookmark', (req, res, next) => {
  const { id } = req.params;
  const { selectedLibraryName } = req.body;

  Library.findOneAndUpdate(
    { title: selectedLibraryName, user: req.user._id, sound: { $ne: id } },
    { $push: { sound: id } }
  )

    .then(() => {
      res.json({});
    })
    .catch((error) => {
      next(error);
    });
});

// router.post('/:id/bookmark', (req, res, next) => {
//   const { id } = req.params;
//   // console.log('id:' + id);
//   const { selectedLibraryName } = req.body;

//   Library.findOne({
//     title: selectedLibraryName,
//     user: req.user._id,
//     sound: { $ne: id }
//   })
//     .populate('sound')
//     .then(() => {
//       res.json({});
//     })
//     .catch((error) => {
//       next(error);
//     });
// });

// router.delete('/:id/bookmark', (req, res, next) => {});

module.exports = router;
