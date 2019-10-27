const Products = require('../models/products');

const getHomePage = async (req, res) => {
  console.log('GET: /')
  const products = await Products.getAll();
  return res.render('shop/home', {
    pageTitle: 'Home page',
    products,
    path: req.url
  });
};

const getCart = async (req, res) => {
  const path = req.baseUrl + req.path;
  const method = req.method;
  console.log(`${method.toUpperCase()}: ${path}`);
  return res.render('shop/cart', {
    pageTitle: 'Cart',
    path
  });
};

const getOrders = async (req, res) => {
  const path = req.baseUrl + req.path;
  const method = req.method;
  console.log(`${method.toUpperCase()}: ${path}`);
  return res.render('shop/orders', {
    pageTitle: 'Orders',
    path
  });
};

const getCheckout = async (req, res) => {
  const path = req.baseUrl + req.path;
  const method = req.method;
  console.log(`${method.toUpperCase()}: ${path}`);
  return res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path
  });
};

module.exports = {
  getHomePage,
  getCart,
  getOrders,
  getCheckout
};