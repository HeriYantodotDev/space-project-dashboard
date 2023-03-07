function checkLoggedin(req, res, next) {

  console.log(req.user);
  const isLoggedIn = req.isAuthenticated();

  if (!isLoggedIn) {
    return res.status(404).json({
      error: "You must log in!",
    });
  }
  next();
}

module.exports = {checkLoggedin}