// require('dotenv').config();

const { getUser, getAgent, getTodos } = require('../db/data-helpers');
const request = require('supertest');
const app = require('../lib/app');
// const connect = require('../lib/utils/connect');
// const mongoose = require('mongoose');
// const Todo = require('../lib/models/Todo');


describe('todo routes', () => {


  it('creates a new todo without a user', async() => {
    return getAgent()
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

  it('creates a new todo WITH a user', async() => {
    const user = await getUser({ username: 'Eli' });

    return getAgent()
      .post('/api/v1/todos')
      .send({
        user: user,
        title: 'Test with a user logged in',
        complete: false,
        description: 'this one was created after being logged in'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          user: user._id,
          title: 'Test with a user logged in',
          complete: false,
          description: 'this one was created after being logged in',
          date: expect.any(String),
          __v: 0
        });
      });
  });

  // it('gets all todos', async() => {
  //   const todos = await getTodos();
  //   return request(app)
    
  // });

  // it('gets a todo by id', () => {
  //   return Todo.create({
  //     title: 'Hi there',
  //     complete: false,
  //     description: 'cool todo'
  //   })
  //     .then(todo => {
  //       return request(app)
  //         .get(`/api/v1/todos/${todo.id}`);
  //     })
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         _id: expect.any(String),
  //         title: 'Hi there',
  //         complete: false,
  //         description: 'cool todo',
  //         date: expect.any(String),
  //         __v: 0
  //       });
  //     });
  // });

  // it('updates a todo by id', () => {
  //   return Todo.create({
  //     title: 'Hi there',
  //     complete: false,
  //     description: 'cool todo'
  //   })
  //     .then(todo => {
  //       return request(app)
  //         .patch(`/api/v1/todos/${todo.id}`)
  //         .send({ title: 'corn cob' });
  //     })
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         _id: expect.any(String),
  //         title: 'corn cob',
  //         complete: false,
  //         description: 'cool todo',
  //         date: expect.any(String),
  //         __v: 0
  //       });
  //     });
  // });

  // it('deletes a todo by id', () => {
  //   return Todo.create({
  //     title: 'Hi there',
  //     complete: false,
  //     description: 'cool todo'
  //   })
  //     .then(todo => {
  //       return request(app)
  //         .delete(`/api/v1/todos/${todo.id}`);
  //     })
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         _id: expect.any(String),
  //         title: 'Hi there',
  //         complete: false,
  //         description: 'cool todo',
  //         date: expect.any(String),
  //         __v: 0
  //       });
  //     });
  // });
});
