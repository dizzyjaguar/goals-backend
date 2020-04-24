const { getAgent } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');

describe('auth routes', () => {
  
  it('signs up a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'Jimmy',
        password: '707weed',
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'Jimmy',
          __v: 0
        });
      });
  });

  it('logs in a user', async() => {
    await User.create({
      username: 'Eli',
      password: '707weed'
    });

    return request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'Eli',
        password: '707weed'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'Eli',
          __v: 0
        });
      });
  });

});
