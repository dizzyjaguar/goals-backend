const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  goal : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Goal',
    required: true
  },
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
      delete ret.__v;
    }
  }
});


module.exports = mongoose.model('Star', schema);
