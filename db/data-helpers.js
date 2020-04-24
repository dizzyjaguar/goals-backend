require('dotenv').config();

const connect = require('../lib/utils/connect');
const seed = require('../db/seed');
const mongoose = require('mongoose');
const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');

beforeAll(() => {
  connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

beforeEach(() => {
  return seed();
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
      [`get${Model.modelName}`]: (query, select) => Model.findOne(query).select(select).then(prepare),
      [`get${Model.modelName}s`]: (query, select) => Model.find(query).select(select).then(prepareAll)
    };
  }, {});

module.exports = getters;
