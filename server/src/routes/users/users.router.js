const express = require('express');

const {httpCreateNewUser} = require('./users.controller');

const {httpGetUserProfileByID} = require('./users.controller');

const usersRouter = express.Router();

// usersRouter.get('/:id', httpGetUserDataByID);
usersRouter.post('/create', httpCreateNewUser);

usersRouter.get('/id', httpGetUserProfileByID);

module.exports = usersRouter;
