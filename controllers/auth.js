const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');
const mailer = require('../util/mailer');
const { getResetToken } = require('../util');
const { resetPassword } = require('../util/mailer');

const loginView = (req, res) => {
  return res.render('auth/login', { pageTitle: 'Login' });
}
const signUpView = (req, res) => {
  return res.render('auth/signup', { pageTitle: 'SignUp' });
}
const checkPasswordView = (req, res) => {
  return res.render('auth/check-password', { pageTitle: 'ResetPassword' });
}
const forgotPasswordView = (req, res) => {
  return res.render('auth/forgot-password', {
    pageTitle: 'Forgot Password'
  });
}
const resetPasswordView = async (req, res) => {
  const { passwordToken } = req.params;
  const user = await User.findByQuery({ resetToken: passwordToken, exp: { $gt: Date.now() } });
  if (!user) {
    console.warn('User is not found');
    return res.redirect('/signup');
  }

  return res.render('auth/reset-password', {
    pageTitle: 'Reset Password',
    passwordToken,
    userId: user._id.toString()
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
  await req.session.save();
  res.redirect('/');
  mailer.singUp(email);
}

const forgotPasswordAPI = async (req, res) => {
  const { email } = req.body;
  const isSignedUpUser = await User.findByQuery({ email });
  if (!isSignedUpUser) {
    console.warn('Can not reset password for unexistent user');
    return res.redirect('/forgot-password');
  }
  const resetToken = await getResetToken();
  const exp = Date.now() + 1.8e6;
  await User.update({ email }, { resetToken, exp });
  await resetPassword(resetToken, exp, isSignedUpUser.email);
  res.redirect('/check-password')
}
const resetPasswordAPI = async (req, res) => {
  const { newPassword, passwordToken, userId } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedNewPassword = await bcrypt.hash(newPassword, salt);
  await User.update(
    { _id: new ObjectId(userId), resetToken: passwordToken, exp: { $gt: Date.now() } },
    { resetToken: null, exp: null, password: hashedNewPassword }
  );

  res.redirect('/login');
}


module.exports = {
  loginView,
  signUpView,
  forgotPasswordView,
  checkPasswordView,
  resetPasswordView,
  loginPostAPI,
  logOutPostAPI,
  signUpPostApi,
  forgotPasswordAPI,
  resetPasswordAPI,
}