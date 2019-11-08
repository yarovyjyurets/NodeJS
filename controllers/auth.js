const loginView = (req, res) => {
  console.log(req.cookies)
  console.dir(req.cookies.isLoggedIn, { colors: true, depth: 5 })
  return res.render('auth/login', {
    pageTitle: 'Login',
    path: req.fullPath,
    isAuthenticated: false
  });
}
const loginPostAPI = (req, res) => {
  req.session.isAuthenticated = true;

  return res.redirect('/');
}

const logOutPostAPI = async (req, res) => {
  await req.session.destroy();
  return res.redirect('/');
}


module.exports = {
  loginView,
  loginPostAPI,
  logOutPostAPI,
}