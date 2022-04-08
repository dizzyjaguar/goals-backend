const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  // this would need to be inserted somehow from the auth??
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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

schema.statics.getGoalsByUser = function(user) {
  return this
    .aggregate(
      [
        {
          '$match': {
            'createdBy': ObjectId(user)
          }
        }
      ]
    );
};

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
    )
    .then(goals => goals[0]);
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

