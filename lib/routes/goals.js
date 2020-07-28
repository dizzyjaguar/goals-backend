const { Router } = require('express');
const Goal = require('../models/Goal');

//create these routes and tests next then experiment in postman and get the right populates and aggregates
module.exports = Router()
  .post('/', (req, res, next) => {
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
      .findById(req.params.id)
      .populate('insights')
      .populate('createdBy')
      .then(goal => res.send(goal))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Goal
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(goal => res.send(goal))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Goal
      .findByIdAndDelete(req.params.id)
      .then(goal => res.send(goal))
      .catch(next);
  })

