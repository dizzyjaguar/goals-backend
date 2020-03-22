const { Router } = require('express');
const Todo = require('../models/Todo');

module.exports = Router()
  .post('/', (req, res) => {
    Todo
      .create(req.body)
      .then(todo => res.send(todo));
  })

  .get('/', (req, res) => {
    Todo
      .find()
      .then(todos => res.send(todos));
  })

  .get('/:id', (req, res) => {
    Todo
      .findById(req.params.id)
      .then(todo => res.send(todo));
  })

  // cant figure out how to make this route work in postman
  .patch('/:id', (req, res) => {
    Todo
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(todo => res.send(todo));
  })

  .delete('/:id', (req, res) => {
    Todo
      .findByIdAndDelete(req.params.id)
      .then(product => res.send(product));
  });

