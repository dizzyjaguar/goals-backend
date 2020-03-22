const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    maxLength: 30,
    required: true
  },
  email: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model('User', schema);
