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
      .find()
      .then(goals => res.send(goals))
      .catch(next);
  })