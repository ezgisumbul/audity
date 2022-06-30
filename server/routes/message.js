'use strict';

const express = require('express');
const Message = require('../models/message');
const User = require('./../models/user');
const routeGuard = require('./../middleware/route-guard');

const router = new express.Router();

router.get('/list', routeGuard, (req, res, next) => {
  const authenticatedUserId = req.user._id;
  Message.find({
    $or: [{ sender: authenticatedUserId }, { receiver: authenticatedUserId }]
  })
    .then((messages) => {
      const messagesOtherUserIds = messages
        .map((message) => {
          return String(message.sender) === String(authenticatedUserId)
            ? message.receiver
            : message.sender;
        })
        // If in second iteratoin there is the same id, jump to else and only return the acc.
        // Returns an array of userIds with which user was writing messages back and forth
        .reduce((acc, id, index, original) => {
          if (original.indexOf(id) === index) {
            return [...acc, id];
          } else {
            return acc;
          }
        }, []);
      return User.find({ _id: { $in: messagesOtherUserIds } });
    })
    .then((profiles) => {
      //Responding with user objects for users with whom we've been messaging
      res.json({ threads: profiles });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const authenticatedUserId = req.user._id;
  const otherUserId = req.params.id;
  Message.find({
    $or: [
      { sender: authenticatedUserId, receiver: otherUserId },
      { sender: otherUserId, receiver: authenticatedUserId }
    ]
  })
    .sort({ createdAt: 1 })
    .then((messages) => {
      res.json({ messages });
    })

    /*     ////To load name and picture of other user
    .then((profiles) => {
      res.json({ profiles: threads });
    }) */

    .catch((error) => {
      next(error);
    });
});

router.post('/:id', (req, res, next) => {
  const sender = req.user._id;
  const receiver = req.params.id;
  const { content } = req.body;
  Message.create({ sender, receiver, content })
    .then((message) => {
      res.json({ message });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
