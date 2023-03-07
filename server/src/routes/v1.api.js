const express = require('express');

const planetsRouter = require('./planets/planets.router');
const launchesRouter = require('./launches/launches.router');
const usersRouter = require('./users/users.router');

const api = express.Router();

api.use('/planets', planetsRouter);
api.use('/launches', launchesRouter);
api.use('/users', usersRouter);

module.exports = api;
