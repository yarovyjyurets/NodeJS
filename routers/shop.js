const { Router } = require('express');
const shopController = require('../controllers/shop');
const handler = require('../util/handler')
const authCheck = require('../middlewares/authCheck');

const shopRouter = Router();

// === Views ===
shopRouter.get('/', handler(shopController.getHomePage));
shopRouter.get('/cart', authCheck, handler(shopController.getCart));
shopRouter.get('/orders', authCheck, handler(shopController.getOrders));
shopRouter.get('/checkout', authCheck, handler(shopController.getCheckoutView));
shopRouter.get('/product-detail/:id', handler(shopController.getProductDetail));

// === REST ===
shopRouter.post('/cart', handler(shopController.postCart));
shopRouter.post('/cart-delete-item/:productId', handler(shopController.postDeleteProductFromCart));
shopRouter.get('/checkout/success', authCheck, handler(shopController.postPlaceOrder));
shopRouter.get('/checkout/cancel', authCheck, handler(shopController.getCheckoutView));
shopRouter.get('/invoice/:orderId', handler(shopController.getInvoiceAPI));

module.exports = shopRouter;
