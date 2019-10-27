const Products = require('../models/products');

const getHomePage = async (req, res) => {
  console.log('GET: /')
  const products = await Products.getAll();
  return res.render('shop/home.ejs', {
    pageTitle: 'Home page',
    products,
    path: req.url
  });
};

module.exports = {
  getHomePage
};