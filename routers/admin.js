const { Router } = require('express');
const adminRouter = Router();
const adminController = require('../controllers/admin');
const handler = require('../util/handler')

// === Views ===
adminRouter.get('/add-product', handler(adminController.addProductView));

// === REST ===
adminRouter.post('/add-product', handler(adminController.addProductAPI));

module.exports = adminRouter;
