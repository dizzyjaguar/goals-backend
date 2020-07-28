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


// THIS IS NOW INCLUDED IN THE AGGREGATE
// schema.virtual('insights', {
//   //need to create the Insight model
//   ref: 'Insight',
//   localField: '_id',
//   //This needs to be a field with an Object ID pointing to a specific goal
//   foreignField: 'goalPost'
// });

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

