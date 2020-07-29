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
  //consider changing the maxlength to similar length of twitters max char length
  insight: {
    type: String,
    required: true,
    maxlength: 9000
  },
  date: {
    type: Date,
    default: Date.now
  },
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.__v;
    }
  }
});


module.exports = mongoose.model('Insight', schema);
