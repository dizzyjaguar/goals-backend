const { Router } = require('express');
const Star = require('../models/Star');
// const { findByIdAndUpdate } = require('../models/User');
const User = require('../models/User');

module.exports = Router()
  // get all users
  .get('/', (req, res, next) => {
    User
      .find()
      .populate('allUserGoals')
      .then(users => res.send(users))
      .catch(next);
  })
  // get a user by id
  .get('/:id', (req, res, next) => {
    User
      .findById(req.params.id)
      .populate('allUserGoals')
      .then(user => res.send(user))
      .catch(next);
  })

  .patch('/complete/:id', (req, res, next) => {
    User
      .findByIdAndUpdate(req.params.id, 
        { $push: { completedGoals: req.body.goal } }, { new: true })
      .then(user => res.send(user))
      .catch(next);
    // this wont work because it also will need the user not just the star
    Star
      .findOneAndUpdate({ user: req.params.id, goal: req.body.goal }, { complete: true }, { new: true })
      .catch(next);
  });
