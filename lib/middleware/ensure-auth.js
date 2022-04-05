const User = require('../models/User');

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  User
    .findByToken(token)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(next);
};
