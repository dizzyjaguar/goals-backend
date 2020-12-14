const { Router } = require('express');
const Goal = require('../models/Goal');
const ensureAuth = require('../middleware/ensure-auth');
const User = require('../models/User');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Goal
      .create(req.body)
      .then(goal => res.send(goal))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Goal
      .getAllFields()
      .then(goals => res.send(goals))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Goal
      .getAllFieldsById(req.params.id)
      .then(goal => res.send(goal))
      .catch(next);
  })

  .get('/:user', (req, res, next) => {
    Goal
      .getGoalsByUser(req.params.user)
      .then(goals => res.send(goals))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Goal
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(goal => res.send(goal))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Goal
      .findByIdAndDelete(req.params.id)
      .then(goal => res.send(goal))
      .catch(next);
  });

