const { Router } = require('express');
const shopController = require('../controllers/shop');
const handler = require('../util/handler')

const shopRouter = Router();

// === Views ===
shopRouter.get('/', handler(shopController.getHomePage));

// === REST ===

module.exports = shopRouter;
