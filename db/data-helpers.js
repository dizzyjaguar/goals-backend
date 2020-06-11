require('dotenv').config();

const connect = require('../lib/utils/connect');
const seed = require('../db/seed');
const mongoose = require('mongoose');
const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');

//EVERYTIME YOU RUN TESTS THIS WILL HAPPEN
//WIPING ANY DATA THAT YOU CREATED
//SEEDING IT WITH RANDOM DATA

//CONSIDER MAKING ANOTHER DATABASE JUST FOR RUNNING TESTS SO IF YOU HAVE 
//REAL DATA YOU DONT WANT TO GET RID OF IT WONT GET WIPED OFF


beforeAll(() => {
  connect();
});
// this is wiping and seeding the database
beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

// commented out to stop seeding the database unnecssarily
// beforeEach(() => {
//   return seed();
// });

const agent = request.agent(app);
beforeEach(() => {
  return agent
    .post('/api/v1/auth/login')
    .send({
      username: 'Eli',
      password: '707weed'
    });
});

afterAll(() => {
  return mongoose.connection.close();
});

const prepare = model => JSON.parse(JSON.stringify(model));
const prepareAll = models => models.map(prepare);

//read the models 
const files = fs.readdirSync('./lib/models');
const getters = files
  //for each model import the model
  .map(file => require(`../lib/models/${file}`))
  //double check to make sure its a model
  .filter(Model => Model.prototype instanceof mongoose.Model)
  //for each model create a getModelName function that returns an instance of the model
  .reduce((acc, Model) => {
    return {
      ...acc,
      //singular get for example getTodo
      [`get${Model.modelName}`]: (query, select) => Model.findOne(query).select(select).then(prepare),
      //plural get for example getTodos
      [`get${Model.modelName}s`]: (query, select) => Model.find(query).select(select).then(prepareAll)
    };
  }, {});

module.exports = {
  ...getters,
  getAgent: () => agent
};
