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
  currentParticipants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Goal',
    required: false
  }],
  completedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }],
  date: {
    type: Date,
    default: Date.now
  },
}, {
  toJSON: {
    virtuals: true
  }
});

// need to add createdBy to my aggregate so i can access the username just as i did with a virtual, trying to get it to do that without it being an array

schema.statics.getAllFields = function() {
  return this
    .aggregate(
      [
        {
          '$lookup': {
            'from': 'stars', 
            'localField': '_id', 
            'foreignField': 'goal', 
            'as': 'stars'
          }
        }, {
          '$lookup': {
            'from': 'insights', 
            'localField': '_id', 
            'foreignField': 'goalPost', 
            'as': 'insights'
          }
        }, {
          '$lookup': {
            'from': 'users', 
            'localField': 'createdBy', 
            'foreignField': '_id', 
            'as': 'createdBy'
          }
        }, {
          '$unwind': {
            'path': '$createdBy'
          }
        }, {
          '$set': {
            'totalStars': {
              '$size': '$stars'
            }
          }
        }
      ]
    );
};



module.exports = mongoose.model('Goal', schema);

