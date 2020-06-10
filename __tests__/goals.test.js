const { getUser, getAgent, getGoals } = require('../db/data-helpers');
const request = require('supertest');
const app = require('../lib/app');
const Goal = require('../lib/models/Goal');

describe('goal routes', () => {

  it('creates a new goal with a user', async() => {
    const creator = await getUser();

    return getAgent()
      .post('/api/v1/goals')
      .send({
        createdBy: creator._id,
        title: 'My test Goal',
        description: 'a test goal',
        completedBy: []
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          createdBy: creator._id,
          title: 'My test Goal',
          description: 'a test goal',
          completedBy: [],
          date: expect.any(String),
          __v: 0
        });
      });
  });

});
