const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
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

//sample aggregate
schema.statics.onlyThreeTodos = function() {
  return this
    .aggregate(
      [
        {
          '$limit': 3
        }
      ]
    );
};

module.exports = mongoose.model('Todo', schema);
