const { Router } = require('express');
const Goal = require('../models/Goal');
const Star = require('../models/Star');
const Insight = require('../models/Insight');
const ensureAuth = require('../middleware/ensure-auth');


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

  .get('/created/:user', (req, res, next) => {
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

  // may also need to delete from the array of completedGoals that lives on the user model because it still shows up in Compass, but it doesnt seem to render any error and doesnt appear in redux
  .delete('/:id', ensureAuth, (req, res, next) => {
    Goal
      .findByIdAndDelete(req.params.id)
      .then(goal => res.send(goal))
      .catch(next);
    Star
      .deleteMany({ goal: req.params.id })
      .catch(next);
    Insight
      .deleteMany({ goalPost: req.params.id })
      .catch(next);
  });

