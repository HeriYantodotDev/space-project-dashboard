const passport = require('passport');

function googleAuthentification(req, res) {
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })(req, res);
}

function loginHandler(req, res) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/failure',
    failureFlash: true
  })(req, res);

}

function googleCallBackHandler(req, res) {
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: true,
  })(req, res),
  (req, res) => {
    console.log("Google Called us back! Yeah");
  }
}


// function googleCallBackHandler(req, res, next) {
//   passport.authenticate("google", {
//     failureRedirect: "/failure",
//     successRedirect: "/",
//     session: true,
//   }, (err, user, info) => {
//     if (err) {
//       console.error(err);
//       return next(err);
//     }
//     if (!user) {
//       console.error(info);
//       return res.redirect("/failure");
//     }
    
//     console.log("Google Called Back!"); // Moved inside the success callback
//     return res.redirect("/");
//   })(req, res, next);
// }


// function googleCallBackHandler(req, res, next) {
//   passport.authenticate("google", {
//     failureRedirect: "/failure",
//     successRedirect: "/",
//     session: true,
//   })(req, res, next);
  
//   console.log("Google Called Back!"); 
// }


// function googleCallBackHandler(req, res) {
//   passport.authenticate("google", {
//     failureRedirect: "/failure",
//     successRedirect: "/",
//     session: true,
//   }, (req, res) => {
//     console.log("Google Called Back!");
//   })(req, res);
// }


function logOut(req, res) {
  req.logout();
  return res.redirect("/");
}


function failure(req, res) {
  res.send("Failed to log in!");
}

function loginHandler(req, res) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/failure',
    failureFlash: true
  })(req, res);

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
}