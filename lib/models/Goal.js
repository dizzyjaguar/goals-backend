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


// needed to bring in ObjectId so i can use it so mongo reads my aggregate query correctly
const ObjectId = require('mongodb').ObjectId;

schema.statics.getAllFieldsById = function(id) {
  return this
    .aggregate(
      [
        {
          '$match': {
            '_id': ObjectId(id)
          }
        },
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

