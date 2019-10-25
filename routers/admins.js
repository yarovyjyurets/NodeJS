const { Router } = require('express');
const adminRouter = Router();

adminRouter.get('/add-product', (req, res) => {
  console.log('GET: /add-product');
  return res.sendFile('views/add-product.html', { root: process.cwd() })
});

adminRouter.post('/add-product', (req, res) => {
  console.log('POST: /add-product');
  console.dir(req.body, { colors: true, depth: 5 })
  return res.redirect('/')
});

module.exports = adminRouter;
