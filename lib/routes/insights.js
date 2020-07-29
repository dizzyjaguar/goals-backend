const { Router } = require('express');
const Insight = require('../models/Insight');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Insight
      .create(req.body)
      .then(insight => res.send(insight))
      .catch(next);
  })

  //going to need a more complicated route for getting all the insights related to one post possibly? or maybe that logic will live more on the Goal route?
  .get('/', (req, res, next) => {
    Insight
      .find()
      .populate('insightBy')
      .populate('goalPost')
      .then(insights => res.send(insights))
      .catch(next);
  });