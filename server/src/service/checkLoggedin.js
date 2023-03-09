function checkLoggedin(req, res, next) {

  console.log(req.user);
  const isLoggedIn = req.isAuthenticated();

  if (!isLoggedIn) {
    return res.redirect('/tempURL/mustLogIn');
  }
  next();
}

module.exports = {checkLoggedin}