const express = require('express')
const groupService = require('./group-service')
const {requireAuth} = require('../auth/jwt-auth')

const groupRouter = express.Router()
const jsonBodyParser = express.json()

groupRouter
  .route('/')
  .all(requireAuth)
  .post(jsonBodyParser, (req, res, next) => {
    const {group_name} = req.body
    const newGroup = {
      group_name
    }
    const db = req.app.get('db')
    groupService.createGroup(db, newGroup)
      .then(data => {
        res.status(200)
          .json(data)
      })
      .catch(next)
  })

groupRouter
  .route('/:groupid')
  .all(requireAuth)
  .get((req, res, next) => {
    const db = req.app.get('db')
    groupService.getGroupName(db, req.params.groupid)
      .then(data => {
        res.status(200)
          .json(data)
      })
      .catch(next)
  })

module.exports = groupRouter