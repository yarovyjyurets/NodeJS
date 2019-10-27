const { Router } = require('express');
const adminRouter = Router();
const adminController = require('../controllers/admin');

// === Views ===
adminRouter.get('/add-product', adminController.views.addProduct);

// === REST ===
adminRouter.post('/add-product', (req, res) => {
  console.log('POST: /add-product');
  console.dir(req.body, { colors: true, depth: 5 })
  return res.redirect('/')
});

module.exports = adminRouter;
