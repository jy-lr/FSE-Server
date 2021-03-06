require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const authRouter = require('./auth/auth-router');
const userRouter = require('./user/user-router');
const groupRouter = require('./group/group-router');
const equityRouter = require('./equity/equity-router');
const userGroupRouter = require('./user-group/user-group-router');
const userGraphRouter = require('./user-graph/user-graph-router');
const schedule = require('node-schedule')

const app = express();

const morganOption = (NODE_ENV === 'production') ? 'tiny': 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

let startTime = new Date(Date.now() + 5000);
let endTime = new Date(startTime.getTime() + 5000);
var j = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/1 * * * * *' }, function(){
});

app.use('/api/login', authRouter)
app.use('/api/user', userRouter)
app.use('/api/group', groupRouter)
app.use('/api/equity', equityRouter)
app.use('/api/usergroup', userGroupRouter)
app.use('/api/usergraph', userGraphRouter)

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

module.exports = app