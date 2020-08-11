const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Star = require('../models/Star');


module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Star
      .create(req.body)
      .then(star => res.send(star))
      .catch(next);
  })

  //this route is for returning all the starred Goals a specific user has 
  .get('/', ensureAuth, (req, res, next) => {
    Star
      .find({ user: req.user._id })
      .populate('goal')
      .then(stars => res.send(stars))
      .catch(next);
  })

  //this route is for returning just all the users that have starred the post
  .get('/:id', ensureAuth, (req, res, next) => {
    Star
      .find({ goal: req.params.id })
      .populate('user')
      .then(users => res.send(users))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Star
      .findByIdAndDelete(req.params.id)
      .then(favorite => res.send(favorite))
      .catch(next);
  });
