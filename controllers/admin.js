const Products = require('../models/products');

const addProductView = (req, res) => {
  console.log('<addProduct>');
  return res.render('admin/add-product.ejs', {
    pageTitle: 'Add product',
    products: [],
    path: req.url
  })
}

const addProductAPI = async (req, res) => {
  console.log('POST: <add-product>');
  console.dir(req.body, { colors: true, depth: 5 })
  await Products.addProduct(req.body);
  return res.redirect('/');
}

module.exports = {
  addProductView,
  addProductAPI
}