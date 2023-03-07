const express = require('express');

const {httpGetUserDataByID} = require('./users.controller')

const {httpCreateNewUser} = require('./users.controller')

const usersRouter = express.Router();

// usersRouter.get('/:id', httpGetUserDataByID);
usersRouter.post('/create', httpCreateNewUser)

module.exports = usersRouter;
