const { Router } = require('express');
const authController = require('../controllers/auth');
const handler = require('../util/handler')

const shopRouter = Router();

// === Views ===
shopRouter.get('/login', handler(authController.loginView));
shopRouter.get('/signup', handler(authController.signUpView));
shopRouter.get('/forgot-password', handler(authController.forgotPasswordView));
shopRouter.get('/check-password', handler(authController.checkPasswordView));
shopRouter.get('/reset-password/:passwordToken', handler(authController.resetPasswordView));

// === REST ===
shopRouter.post('/login', handler(authController.loginPostAPI));
shopRouter.post('/logout', handler(authController.logOutPostAPI));
shopRouter.post('/signup', handler(authController.signUpPostApi));
shopRouter.post('/forgot-password', handler(authController.forgotPasswordAPI));
shopRouter.post('/reset-password', handler(authController.resetPasswordAPI));
module.exports = shopRouter;
