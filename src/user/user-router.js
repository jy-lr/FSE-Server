const express = require('express')
const path = require('path')
const userServices = require('./user-services')
const {requireAuth} = require('../auth/jwt-auth')

const userRouter = express.Router()
const jsonBodyParser = express.json()

userRouter
  .post('/', jsonBodyParser, (req, res, next) => {
    const {full_name, user_name, password} = req.body
    const db = req.app.get('db')

    if(!full_name)
      return res.status(400).json({
        error: `Missing Fullname in request body`
      })

    if(!user_name)
      return res.status(400).json({
        error: `Missing Username in request body`
      })

    if(!password)
      return res.status(400).json({
        error: `Missing Password in request body`
      })

    const passwordError = userServices.validatePassword(password)

    if(passwordError)
      return res.status(400).json({
        error: passwordError
      })

    userServices.hasUserwithUsername(db, user_name)
      .then(hasUserwithUsername => {
        if(hasUserwithUsername)
          return res.status(400).json({
            error: 'Username already taken'
          })
      })

    userServices.hashPassword(password)
      .then(hashedPassword => {
        const newUser = {
          user_name,
          full_name,
          password: hashedPassword
        }
        return userServices.insertUser(db, newUser)
          .then(user => {
            res.status(201)
              .location(path.posix.join(req.originalUrl, `/${user.id}`))
              .json(userServices.serializeUser(user))
          })
      })
      .catch(next)
  })
  .get('/', (req, res, next) => {
    const db = req.app.get('db')
    return userServices.getAllUsers(db)
      .then(users => {
        res.status(200)
          .json(users)
      })
  })

userRouter
  .route('/:userid')
  .all(requireAuth)
  .get((req, res, next) => {
    const db = req.app.get('db')
    const userId = req.params.userid
    userServices.getUserId(db, userId)
      .then(user => {
        res.status(200)
          .json(user)
      })
  })


module.exports = userRouter