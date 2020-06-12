const { Router } = require('express');
const Insight = require('../models/Insight');

module.exports = Router()
  .post('/', (req, res, next) => {
    Insight
      .create(req.body)
      .then(insight => res.send(insight))
      .catch(next);
  });