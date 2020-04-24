const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const schema = new mongoose.Schema({
  username: {
    type: String,
    maxLength: 30,
    required: [true, 'username required'],
    unique: [true, 'user exists already']
  },
  passwordHash: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.passwordHash;
    }
  }
});

schema.virtual('password').set(function(password) {
  const hash = bcrypt.hashSync(password, 12);
  this.passwordHash = hash;
});

module.exports = mongoose.model('User', schema);
