function checkLoggedin(req, res, next) {

  console.log(req.user);
  const isLoggedIn = req.isAuthenticated();

  if (!isLoggedIn) {
    return res.status(404).json({ 
      message: "Please Log In First"
    });
  }
  next();
}

module.exports = {checkLoggedin}