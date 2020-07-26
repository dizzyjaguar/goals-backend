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

  .get('/', ensureAuth, (req, res, next) => {
    Star
      .find({ user: req.user._id })
      .populate('goal')
      .then(stars => res.send(stars))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Star
      .findByIdAndDelete(req.params.id)
      .then(favorite => res.send(favorite))
      .catch(next);
  });
