require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Todo = require('../lib/models/Todo');

describe('todo routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a new todo', () => {
    return request(app)
      .post('/api/v1/todos')
      .send({
        title: 'REAL TEST',
        complete: false,
        description: 'this one we tested with .test.js'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'REAL TEST',
          complete: false,
          description: 'this one we tested with .test.js',
          date: expect.any(String),
          __v: 0
        });
      });
  });

});
