const { Router } = require('express');
const Insight = require('../models/Insight');
const { verifyToken } = require('../middleware/verifyToken');

module.exports = Router()
  .post('/', verifyToken, (req, res, next) => {
    Insight
      .create(req.body)
      .then(insight => res.send(insight))
      .catch(next);
  })

  // get all insights in the database
  .get('/', (req, res, next) => {
    Insight
      .find()
      .populate('insightBy')
      .populate('goalPost')
      .then(insights => res.send(insights))
      .catch(next);
  })

  // get all insights per specefic goal post
  .get('/:id', (req, res, next) => {
    Insight
      .find({ goalPost: req.params.id })
      .populate('insightBy')
      .then(insights => res.send(insights))
      .catch(next);
  })
//make Insights be able to be upvoted or also Starred so users can find helpful insights regarding the goal they are trying to complete
