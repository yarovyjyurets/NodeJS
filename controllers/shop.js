const Products = require('../models/products');
const Cart = require('../models/cart');
const Order = require('../models/order');
const { createInvoice } = require('../util/pdf-generator');

const getHomePage = async (req, res) => {
  const products = await Products.getAll();
  return res.render('shop/home', {
    pageTitle: 'Home page',
    products,
  });
};

const getCart = async (req, res) => {
  const cart = await Cart.getCartForUser(req.user);
  return res.render('shop/cart', {
    pageTitle: 'Cart',
    cart,
  });
};

const getOrders = async (req, res) => {
  const orders = await Order.getAll(req.user);
  return res.render('shop/orders', {
    pageTitle: 'Orders',
    orders,
  });
};

const getCheckout = async (req, res) => {
  return res.render('shop/checkout', {
    pageTitle: 'Checkout',
  });
};

const getProductDetail = async (req, res) => {
  const product = await Products.getProductById(req.params.id);
  return res.render('shop/product-detail', {
    pageTitle: 'Product details',
    product,
  });
};

const postCart = async (req, res) => {
  await Cart.addProduct(req.body.productId, req.cart, req.user);
  res.redirect('/');
};

const postDeleteProductFromCart = async (req, res) => {
  await Cart.deleteProduct(req.params.productId, req.cart, req.user);
  res.redirect('/cart');
};

const postPlaceOrder = async (req, res) => {
  await Order.create(req.user, req.cart);
  res.redirect('/orders');
};
const getInvoiceAPI = async (req, res) => {
  const { orderId } = req.params;
  const order = await Order.getById(orderId);

  const pdf = createInvoice(order);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename="filename.pdf"');
  pdf.pipe(res);
};

module.exports = {
  getHomePage,
  getCart,
  getOrders,
  getCheckout,
  getProductDetail,
  postCart,
  postDeleteProductFromCart,
  postPlaceOrder,
  getInvoiceAPI,
};