const express = require('express');

const planetsRouter = require('./planets/planets.router');
const launchesRouter = require('./launches/launches.router');
const usersRouter = require('./users/users.router');
const authRouter = require('./auth/auth.router');

const {checkLoggedin} = require('../service/checkLoggedin');

const api = express.Router();

// api.use(checkLoggedin);

api.use('/planets', planetsRouter);
api.use('/launches', launchesRouter);
api.use('/users', usersRouter);
api.use('/auth', authRouter);

module.exports = api;
