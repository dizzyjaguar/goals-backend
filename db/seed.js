const chance = require('chance').Chance();
const User = require('../lib/models/User');

module.exports = async({ usersToCreate } = {}) => {
  await User.create({
    username: 'Eli',
    password: '707weed'
  });
};
