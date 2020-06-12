const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 80,
  },
  description: {
    type: String,
    required: true,
  },
  stars : {
    type: Number,
    required: false
  },
  completedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }],
  date: {
    type: Date,
    default: Date.now
  }
});


schema.virtual('insights', {
  //need to create the Insight model
  ref: 'Insight',
  localField: '_id',
  //This needs to be a field with an Object ID pointing to a specific goal
  foreignField: 'goalPost'
});

module.exports = mongoose.model('Goal', schema);
