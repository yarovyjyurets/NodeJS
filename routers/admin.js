const { Router } = require('express');
const adminRouter = Router();
const adminController = require('../controllers/admin');
const handler = require('../util/handler')

// === Views ===
adminRouter.get('/add-product', handler(adminController.addProductView));
adminRouter.get('/product-list', handler(adminController.productListView));
adminRouter.get('/edit-product/:productId', handler(adminController.editProductView));

// === REST ===
adminRouter.post('/add-product', handler(adminController.addProductAPI));
adminRouter.post('/edit-product/:productId', handler(adminController.editProductAPI));

module.exports = adminRouter;
