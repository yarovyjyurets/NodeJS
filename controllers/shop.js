const Products = require('../models/products');
const Cart = require('../models/cart');

const getHomePage = async (req, res) => {
  const products = await Products.getAll();
  return res.render('shop/home', {
    pageTitle: 'Home page',
    products,
    path: req.fullPath
  });
};

const getCart = async (req, res) => {
  const cart = await Cart.getCartForUser(req.user);
  return res.render('shop/cart', {
    pageTitle: 'Cart',
    path: req.fullPath,
    cart
  });
};

const getOrders = async (req, res) => {
  return res.render('shop/orders', {
    pageTitle: 'Orders',
    path: req.fullPath,
  });
};

const getCheckout = async (req, res) => {
  return res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: req.fullPath,
  });
};

const getProductDetail = async (req, res) => {
  const product = await Products.getProductById(req.params.id);
  return res.render('shop/product-detail', {
    pageTitle: 'Product details',
    path: req.fullPath,
    product
  });
};

const postCart = async (req, res) => {
  await Cart.addProduct(req.body.productId, req.cart);
  res.redirect('/');
};

const postDeleteProductFromCart = async (req, res) => {
  await Cart.deleteProduct(req.params.productId, req.cart);
  res.redirect('/cart');
};

module.exports = {
  getHomePage,
  getCart,
  getOrders,
  getCheckout,
  getProductDetail,
  postCart,
  postDeleteProductFromCart,
};