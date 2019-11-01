const { Router } = require('express');
const shopController = require('../controllers/shop');
const handler = require('../util/handler')

const shopRouter = Router();

// === Views ===
shopRouter.get('/', handler(shopController.getHomePage));
shopRouter.get('/cart', handler(shopController.getCart));
shopRouter.get('/orders', handler(shopController.getOrders));
shopRouter.get('/checkout', handler(shopController.getCheckout));
shopRouter.get('/product-detail/:id', handler(shopController.getProductDetail));

// === REST ===
shopRouter.post('/cart', handler(shopController.postCart));
shopRouter.post('/cart-delete-item/:productId', handler(shopController.postDeleteProductFromCart));
shopRouter.post('/placeOrder', handler(shopController.postPlaceOrder));

module.exports = shopRouter;
