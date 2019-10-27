const { Router } = require('express');
const shopController = require('../controllers/shop');
const handler = require('../util/handler')

const shopRouter = Router();

// === Views ===
shopRouter.get('/', handler(shopController.getHomePage));
shopRouter.get('/cart', handler(shopController.getCart));
shopRouter.get('/orders', handler(shopController.getOrders));
shopRouter.get('/checkout', handler(shopController.getCheckout));

// === REST ===

module.exports = shopRouter;
