const express = require('express');

const {httpGetUserDataByID} = require('./users.controller')

const usersRouter = express.Router();

usersRouter.get('/:id', httpGetUserDataByID);

module.exports = usersRouter;
