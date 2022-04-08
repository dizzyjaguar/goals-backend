const { Router } = require('express')
const Goal = require('../models/Goal')
const Star = require('../models/Star')
const Insight = require('../models/Insight')
const ensureAuth = require('../middleware/ensure-auth')
const { verifyToken } = require('../middleware/verifyToken')

// need to swtich ensure auth middleware for another one that will check in the headers for the token instead of the header
module.exports = Router()
  .post('/', verifyToken, async(req, res, next) => {
    try {
      const createdGoal = await Goal.create(req.body).then((goal) => goal)

      Star.create({
        user: createdGoal.createdBy,
        goal: createdGoal._id,
        complete: false,
      })
        .then((star) => res.send({
          star: star,
          goal: createdGoal
        }))
        .catch(next)
    }
    catch(error) {
      console.log(error)
    }
  })

  .get('/', (req, res, next) => {
    Goal.getAllFields()
      .then((goals) => res.send(goals))
      .catch(next)
  })

  .get('/:id', (req, res, next) => {
    Goal.getAllFieldsById(req.params.id)
      .then((goal) => res.send(goal))
      .catch(next)
  })

  .get('/created/:user', (req, res, next) => {
    Goal.getGoalsByUser(req.params.user)
      .then((goals) => res.send(goals))
      .catch(next)
  })

  .patch('/:id', (req, res, next) => {
    Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((goal) => res.send(goal))
      .catch(next)
  })

  // may also need to delete from the array of completedGoals that lives on the user model because it still shows up in Compass on th user model, although this may become complicated when multiple users have completed this goal, might need to move completed to its own doc. simliar to how stars are done so that can findManyandDelete them easier just with the goal id
  .delete('/:id', ensureAuth, (req, res, next) => {
    Goal.findByIdAndDelete(req.params.id)
      .then((goal) => res.send(goal))
      .catch(next)
    Star.deleteMany({ goal: req.params.id }).catch(next)
    Insight.deleteMany({ goalPost: req.params.id }).catch(next)
  })
