const express = require('express')
const equityService = require('./equity-service')
const {requireAuth} = require('../auth/jwt-auth')

const equityRouter = express.Router()
const jsonBodyParser = express.json()

equityRouter
  .route('/')
  .all(requireAuth)
  .post(jsonBodyParser, (req, res, next) => {
    const db = req.app.get('db')
    const id = req.user.id
    const {stock_symbol, num_of_shares, groupid} = req.body
    const addEquity = {
      userid: id,
      stock_symbol,
      num_of_shares,
      groupid
    }
    equityService.addEquity(db, addEquity)
      .then(data => {
        res.status(201)
          .json(data)
      })
      .catch(next)
  })
  .delete(jsonBodyParser, (req, res, next) => {
    const db = req.app.get('db')
    const {id} = req.body

    equityService.deleteEquity(db, id)
      .then(data => res.status(204).end())
      .catch(next)
  })
  .patch(jsonBodyParser, (req, res, next) => {
    const db = req.app.get('db')
    const {id, num_of_shares} = req.body
    equityService.updateEquity(db, id, num_of_shares)
      .then(data => {
        res.status(200)
          .json(data)
      })
      .catch(next)
  })
  .get((req, res, next) => {
    const db = req.app.get('db')
    let groupid = req.query.groupid;

    equityService.getEquity(db, groupid)
    .then(data => {
      res.status(200)
        .json(data)
    })
    .catch(next)
  })


equityRouter
  .route('/:groupid')
  .all(requireAuth)
  .get((req, res, next) => {
    const db = req.app.get('db')
    const id = req.user.id
    const groupid = req.params.groupid
    equityService.getEquity(db, groupid)
      .then(data => {
        const userData = data.filter(groupData => groupData.userid === id)
        res.status(200)
          .json(userData)
      })
      .catch(next)
  })

module.exports = equityRouter
