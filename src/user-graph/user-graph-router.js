const express = require('express');
const {requireAuth} = require('../auth/jwt-auth')
const userGraphService = require('./user-graph-service')

const userGraphRouter = express.Router()
const jsonBodyParser = express.json();

userGraphRouter
  .route('/')
  .all(requireAuth)
  .post(jsonBodyParser, (req, res, next) => {
    const db = req.app.get('db')
    const {groupid, equity} = req.body
    const userid = req.user.id

    const newUserData = {
      groupid: groupid,
      userid: userid,
      equity: equity
    }
    userGraphService.createUserGraphData(db, newUserData)
      .then(data =>  {
        res.status(201)
          .json(data)
      })
      .catch(next)
  })
  .patch(jsonBodyParser, (req, res, next) => {
    const db = req.app.get('db')
    const {id, equity, groupid} = req.body
    const userid = req.user.id
    console.log(groupid)
    userGraphService.updateUserGraphData(db, id, equity)
      .then(() => userGraphService.getUserGraphData(db, userid)
      .then(data => {

        const userGraphData = data.filter(userGraphData => parseInt(userGraphData.groupid) === parseInt(groupid))
        res.status(200)
          .json(userGraphData)

      }))
  })

  userGraphRouter
    .route('/:groupid')
    .all(requireAuth)
    .get((req, res, next) => {
      const db = req.app.get('db')
      const groupid = req.params.groupid
      const userid = req.user.id
      console.log(groupid) 

      userGraphService.getUserGraphData(db, userid)
        .then(data => {

          const userGraphData = data.filter(userGraphData => parseInt(userGraphData.groupid) === parseInt(groupid))
          res.status(200)
            .json(userGraphData)

        })
        .catch(next)
  })

  module.exports = userGraphRouter