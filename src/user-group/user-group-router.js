const express = require('express')
const userGroupServices = require('./user-group-services')
const {requireAuth} = require('../auth/jwt-auth')

const userGroupRouter = express.Router()
const jsonBodyParser = express.json()

userGroupRouter
  .route('/')
  .all(requireAuth)
  .post(jsonBodyParser, (req, res, next) => {
    const db = req.app.get('db')
    const {userid, groupid, cash_balance} = req.body
    const insertUserGroup = {
      userid,
      groupid,
      cash_balance
    }
    userGroupServices.insertUserGroup(db, insertUserGroup)
      .then(data => {
        res.status(201)
          .json(data)
      })
      .catch(next)
  })
  .get((req, res, next) => {
    const db = req.app.get('db')
    const userid = req.user.id
    userGroupServices.getAllUsersGroup(db, userid)
      .then(data => {
        res.status(200)
          .json(data)
      })
      .catch(next)
  })
  .patch(jsonBodyParser, (req, res, next) => {
    const db = req.app.get('db')
    const {id, cash_balance} = req.body
    userGroupServices.updateBalance(db, id, cash_balance)
      .then(data => {
        res.status(200)
          .json(data)
      })
      .catch(next)
  })

userGroupRouter
  .route('/:groupid')
  .all(requireAuth)
  .get((req, res, next) => {
    const db = req.app.get('db')
    const groupid = req.params.groupid
    userGroupServices.getAllGroupsUsersWithUserName(db, groupid)
      .then(data => {
        res.status(200)
          .json(data)
      })
      .catch(next)
  })

module.exports = userGroupRouter