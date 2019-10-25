const { Router } = require('express');
const shopRouter = Router();

shopRouter.get('/', (req, res) => {
  console.log('GET: /');
  return res.sendFile('views/shop.html', { root: process.cwd() })
});

module.exports = shopRouter;
