const express = require('express');

const nameRouter = express.Router();

const {controller} = require('./name.controller');

nameRouter.get('/planets', getAllPlanets);

module.exports = nameRouter;

