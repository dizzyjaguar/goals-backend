const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const schema = new mongoose.Schema({
  username: {
    type: String,
    maxLength: 30,
    required: [true, 'username required'],
    unique: [true, 'user exists already']
  },
  passwordHash: {
    type: String,
    required: true
  },
  profilePhotoUrl: {
    type: String,
    required: false
  },
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.passwordHash;
    }
  }
});


schema.virtual('goalsCreated', {
  ref: 'Goal',
  localField: '_id',
  foreignField: 'createdBy'
});

// figure out where to seperate the completed goals from the non completed goals, could be backend or frontend, need to research
schema.virtual('allUserGoals', {
  ref: 'Star',
  localField: '_id',
  foreignField: 'user'
});


schema.virtual('password').set(function(password) {
  const hash = bcrypt.hashSync(password, 8);
  this.passwordHash = hash;
});

schema.methods.authToken = function() {
  const token = jwt.sign({ payload: this.toJSON() }, process.env.SECRET_KEY, { expiresIn: '24h' });
  return token;
};

schema.statics.authorize = async function({ username, password }) {
  // console.log(username);
  const user = await this.findOne({ username });
  if(!user) {
    const error = new Error('Not a valid username/password');
    error.status = 401;
    throw error;
  }
  const matchingPassword = await bcrypt.compare(password, user.passwordHash);
  if(!matchingPassword) {
    const error = new Error('Not a valid username/password');
    error.status = 401;
    throw error;
  }
  return user;
};

schema.statics.findByToken = function(token) {
  try {
    const { payload } = jwt.verify(token, process.env.SECRET_KEY);
    return Promise.resolve(this.hydrate(payload));
  } catch(e) {
    return Promise.reject(e);
  }
};


module.exports = mongoose.model('User', schema);
