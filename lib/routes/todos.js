const { Router } = require('express');
const Todo = require('../models/Todo');

module.exports = Router()
  //create a todo
  .post('/', (req, res) => {
    Todo
      .create(req.body)
      .then(todo => res.send(todo));
  })
  //get all todos
  .get('/', (req, res) => {
    Todo
      .find()
      .then(todos => res.send(todos));
  })
  //get a specific todo
  .get('/:id', (req, res) => {
    Todo
      .findById(req.params.id)
      .then(todo => res.send(todo));
  })

  // edit a todo
  .patch('/:id', (req, res) => {
    Todo
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(todo => res.send(todo));
  })
  // delete a todo
  .delete('/:id', (req, res) => {
    Todo
      .findByIdAndDelete(req.params.id)
      .then(product => res.send(product));
  });

