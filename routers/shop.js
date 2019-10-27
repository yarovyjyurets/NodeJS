const { Router } = require('express');
const shopController = require('../controllers/shop');

const shopRouter = Router();

// === Views ===
shopRouter.get('/', shopController.getHomePage);

// === REST ===

module.exports = shopRouter;
