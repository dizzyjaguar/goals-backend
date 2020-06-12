const { Router } = require('express');
const User = require('../models/User');
const ensureAuth = require('../middleware/ensure-auth');

const oneDay = 1000 * 60 * 60 * 24;

module.exports = Router()
  //signup a user
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
  })
  //login a user
  .post('/login', (req, res, next) => {
    User
      .authorize(req.body)
      .then(user => {
        res.cookie('session', user.authToken(), {
          maxAge: oneDay,
          httpOnly: true
        });
        res.send(user);
      })
      .catch(next);
  })
  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  })
  ///logout route here at somepoint 
  
  .get('/user/:id', (req, res, next) => {
    User
      .findById(req.params.id)
      .populate('goalsCreated')
      .then(user => res.send(user))
      .catch(next);
  });
