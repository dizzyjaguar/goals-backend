const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  // get all users
  .get('/', (req, res, next) => {
    User
      .find()
      .populate('goalsCreated')
      .populate('goalsCompleted')
      .populate('currentGoals')
      .then(users => res.send(users))
      .catch(next);
  })
  // get a user by id
  .get('/:id', (req, res, next) => {
    User
      .findById(req.params.id)
      .populate('goalsCompleted')
      .then(user => res.send(user))
      .catch(next);
  })
