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

module.exports = {
  getHomePage
};