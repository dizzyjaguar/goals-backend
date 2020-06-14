const chance = require('chance').Chance();
const User = require('../lib/models/User');
const Todo = require('../lib/models/Todo');

module.exports = async({ usersToCreate = 5, todosToCreate = 10 } = {}) => {
  const loggedIn = await User.create({
    username: 'Eli',
    password: '707weed'
  });

  const users = await User.create([...Array(usersToCreate)].slice(1).map(() => ({
    username: chance.email(),
    password: chance.word()
  })));

  await Todo.create([...Array(todosToCreate)].map(() => ({
    user: chance.weighted([loggedIn, ...users], [2, ...users.map(() => 1)])._id,
    title: chance.word(),
    complete: false,
    description: chance.sentence(),
    date: chance.date()
  })));
};
