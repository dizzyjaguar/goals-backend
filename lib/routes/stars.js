const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Star = require('../models/Star');


module.export = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Star
      .create(req.body)
      .then(star => res.send(star))
      .catch(next);
  })