const { Router } = require('express');
const { verifyToken } = require('../middleware/verifyToken');
const Star = require('../models/Star');


module.exports = Router()
  .post('/', verifyToken, (req, res, next) => {
    Star
      .create(req.body)
      .then(star => res.send(star))
      .catch(next);
  })

  //this route is for returning all the starred Goals a specific user has 
  .get('/', verifyToken, (req, res, next) => {
    Star
      // this is path to grab the user ID from the query payload
      .find({ user: req.user.payload._id })
      .populate('goal')
      .then(stars => res.send(stars))
      .catch(next);
  })
  
  // this route is for completing the star/goal
  .patch('/:id', (req, res, next) => {
    Star.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(star => res.send(star))
      .catch(next)
  })

  //this route is for returning just all the users that have starred the post
  .get('/:id', verifyToken, (req, res, next) => {
    Star
      .find({ goal: req.params.id })
      .populate('user')
      .then(users => res.send(users))
      .catch(next);
  })

  .delete('/:id', verifyToken, (req, res, next) => {
    Star
      .findByIdAndDelete(req.params.id)
      .then(favorite => res.send(favorite))
      .catch(next);
  });
