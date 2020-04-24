const { Router } = require('express');
const User = require('../models/User');

const oneDay = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/signup', (req, res, next) => {
    User
      .create(req.body)
      .then(user => {
        res.cookie('session', user.authToken(), {
          maxAge: oneDay,
          httpOnly: true
        });
        res.send(user);
      })
      .catch(next);
  });
