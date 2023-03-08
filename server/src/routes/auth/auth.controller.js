const passport = require('passport');

const Joi = require('joi'); 

const httpHeaderStatusName = 'X-AuthenticationStatus-Status';
const httpHeaderMessageName = 'X-Message';
const valueHeaderStatusSuccessful = `successful`;
const valueHeaderStatusFailed = `failed`;
const successRedirect = "/v1/auth/success";
const failureRedirect = "/v1/auth/failure";
const googleSuccessRedirect = "/";
const googleFailureRedirect = "/tempURL/failed/googleauth/";


function googleAuthentification(req, res) {
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })(req, res);
}

function loginHandler(req, res) {

  const schema = generateJoiSchemaForLogin();

  const { error } = schema.validate(req.body);

  if (error) {
    res.set({
      [httpHeaderStatusName]: valueHeaderStatusFailed,
      [httpHeaderMessageName]: `${error.details[0].message}`
    }); 
    return res.status(400).json({ 
      authenticationStatus: false,
      message: error.details[0].message 
    });
  }

  passport.authenticate('local', {
    failureRedirect: successRedirect,
    successRedirect: failureRedirect,
    failureFlash: true
  })(req, res);

}

function generateJoiSchemaForLogin() {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  return schema;
}

function googleCallBackHandler(req, res) {
  passport.authenticate("google", {
    failureRedirect: googleFailureRedirect,
    successRedirect: googleSuccessRedirect,
    session: true,
  })(req, res),
  (req, res) => {
    console.log("Google Called us back! Yeah");
  }
}

function logOut(req, res) {
  req.logout();
  return res.redirect("/");
}

function failure(req, res) {
  res.set({
    [httpHeaderStatusName] : valueHeaderStatusFailed ,
    [httpHeaderMessageName]: 'Authentication failed. Please enter a valid email and password.'
  });  
  return res.status(400).json({ 
      authenticationStatus: false,
      message: "Authentication failed. Please enter a valid email and password."
    });
}

function success(req, res) {
  res.set({
    [httpHeaderStatusName] : valueHeaderStatusSuccessful,
    [httpHeaderMessageName]: 'OK'
  });  
  return res.json({ 
      authenticationStatus: true,
      message: "OK"
    });
}

function statusHandler(req, res) {
  const isLoggedIn = req.isAuthenticated();
  res.json({ isLoggedIn });
}


module.exports = {
  googleAuthentification,
  googleCallBackHandler,
  logOut,
  failure,
  loginHandler,
  statusHandler,
  success
}