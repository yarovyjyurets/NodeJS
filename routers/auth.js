const { Router } = require('express');
const authController = require('../controllers/auth');
const handler = require('../util/handler')

const shopRouter = Router();

// === Views ===
shopRouter.get('/login', handler(authController.loginView));
shopRouter.get('/signup', handler(authController.signUpView));

// === REST ===
shopRouter.post('/login', handler(authController.loginPostAPI));
shopRouter.post('/logout', handler(authController.logOutPostAPI));
shopRouter.post('/signup', handler(authController.signUpPostApi));
module.exports = shopRouter;
