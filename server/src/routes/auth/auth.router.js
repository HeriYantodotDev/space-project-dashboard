const express = require('express');

const {  
  googleAuthentification,
  googleCallBackHandler,
  logOut,
  failure,
  loginHandler,
  statusHandler,

} = require('./auth.controller');

const authRouter = express.Router();


authRouter.get('/google', googleAuthentification);
authRouter.get('/google/callback', googleCallBackHandler );

authRouter.post('/login', loginHandler);

authRouter.get('/logout', logOut );

authRouter.get('/failure', failure );
authRouter.get('/status', statusHandler)



module.exports = authRouter;