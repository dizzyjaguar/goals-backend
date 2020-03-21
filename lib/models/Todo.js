const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  // user_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true
  // },
  title: {
    type: String,
    required: true
  },
  complete: {
    type: Boolean,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Todo', schema);