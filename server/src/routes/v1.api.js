const express = require('express');

const planetsRouter = require('./planets/planets.router');
const launchesRouter = require('./launches/launches.router');
const usersRouter = require('./users/users.router');
const authRouter = require('./auth/auth.router');

const {checkLoggedin} = require('../service/checkLoggedin');

const api = express.Router();

// api.use(checkLoggedin);

api.use('/planets', checkLoggedin, planetsRouter);
api.use('/launches', checkLoggedin,  launchesRouter);
api.use('/users', checkLoggedin, usersRouter);
api.use('/auth', authRouter);

module.exports = api;
