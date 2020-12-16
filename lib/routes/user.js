const { Router } = require('express');
// const { findByIdAndUpdate } = require('../models/User');
const User = require('../models/User');

module.exports = Router()
  // get all users
  .get('/', (req, res, next) => {
    User
      .find()
      .populate('goalsCompleted')
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

  // this is not working correctly 
  .patch('/complete/:id', (req, res, next) => {
    const { goal } = req.body.goal;
    User
      .findByIdAndUpdate(req.params.id, 
        { $push: { completedGoals: { goal } } }, { new: true })
      .then(user => res.send(user))
      .catch(next);
  })
