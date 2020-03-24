const { Router } = require('express');
const Todo = require('../models/Todo');

module.exports = Router()
  //create a todo
  .post('/', (req, res, next) => {
    Todo
      .create(req.body)
      .then(todo => res.send(todo))
      .catch(next);
  })
  //get all todos
  .get('/', (req, res, next) => {
    Todo
      .find()
      .then(todos => res.send(todos))
      .catch(next);
  })
  //get a specific todo
  .get('/:id', (req, res, next) => {
    Todo
      .findById(req.params.id)
      .then(todo => res.send(todo))
      .catch(next);
  })

  // edit a todo
  .patch('/:id', (req, res, next) => {
    Todo
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(todo => res.send(todo))
      .catch(next);
  })
  // delete a todo
  .delete('/:id', (req, res, next) => {
    Todo
      .findByIdAndDelete(req.params.id)
      .then(product => res.send(product))
      .catch(next);
  });

