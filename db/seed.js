const chance = require('chance').Chance();
const User = require('../lib/models/User');

module.exports = async({ usersToCreate = 5 } = {}) => {
  await User.create([...Array(usersToCreate)].slice(1).map(() => ({
    username: chance.email(),
    password: chance.word(),
  })));
};
