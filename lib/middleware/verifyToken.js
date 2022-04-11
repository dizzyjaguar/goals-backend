require('dotenv').config();
const jwt = require('jsonwebtoken');
// this is not working!
const verifyToken = async(req, res, next) => {
  try {
    // check if auth header exists
    if(req.headers.authorization) {
      // parse token from header
      const token = req.headers.authorization.split(' ')[1]; //split the header and get the token
      if(token) {
        const payload = await jwt.verify(token, process.env.SECRET_KEY);
        if(payload) {
          // console.log(payload)
          // store user data in request object
          // this doesn't seem to be working but what ever
          req.user = payload;
          next();
        } else {
          res.status(400).json({ error: 'token verification failed' });
        }
      } else {
        res.status(400).json({ error: 'malformed auth header' });
      }
    } else {
      res.status(400).json({ error: 'No authorization header' });
    }
  } catch(error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  verifyToken,
};
