const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  insightBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  goalPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Goal',
    required: true
  },
  insight: {
    type: String,
    required: true,
    maxlength: 9000
  }
});

module.exports = mongoose.model('Insight', schema);
