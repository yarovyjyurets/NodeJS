const User = require('../models/user');
const bcrypt = require('bcryptjs');

const loginView = (req, res) => {
  return res.render('auth/login', {
    pageTitle: 'Login',
    path: req.fullPath,
    isAuthenticated: false
  });
}
const signUpView = (req, res) => {
  return res.render('auth/signup', {
    pageTitle: 'SignUp',
    path: req.fullPath,
    isAuthenticated: false
  });
}

const loginPostAPI = async (req, res) => {
  const { email, password } = req.body;
  const isSignedUpUser = await User.findByQuery({ email });
  if (!isSignedUpUser) {
    console.warn('User is not found');
    return res.redirect('/signup');
  }

  const isCorrectPassword = await bcrypt.compare(password, isSignedUpUser.password)
  if (!isCorrectPassword) {
    console.warn('User password is not correct');
    return res.redirect('/login');
  }

  req.session.isAuthenticated = true;
  req.session.user = isSignedUpUser;
  return res.redirect('/');
}
const logOutPostAPI = async (req, res) => {
  await req.session.destroy();
  return res.redirect('/');
}
const signUpPostApi = async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  if (password !== passwordConfirmation) {
    console.warn('Passwords are not matched');
    return res.redirect('/signup');
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const isExistUserAlready = await User.findByQuery({ email });
  if (isExistUserAlready) {
    return res.redirect('/login');
  }

  const createdUser = await User.create({ email, password: hashedPassword, cart: { products: [] } });
  req.session.isAuthenticated = true;
  req.session.user = createdUser;
  return res.redirect('/');
}


module.exports = {
  loginView,
  signUpView,
  loginPostAPI,
  logOutPostAPI,
  signUpPostApi,
}