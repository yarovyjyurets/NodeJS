const Products = require('../models/products');

const addProductView = (req, res) => {
  console.log('????')
  console.dir(req.fullPath, { colors: true, depth: 5 })
  return res.render('admin/add-product', {
    pageTitle: 'Add product',
    path: req.fullPath 
  });
}

const addProductAPI = async (req, res) => {
  await Products.addProduct(req.body);
  return res.redirect('/');
}

const productListView = async (req, res) => {
  const products = await Products.getAll();
  return res.render('admin/product-list', {
    pageTitle: 'Admin product list',
    products,
    path: req.fullPath
  });
}

module.exports = {
  addProductView,
  addProductAPI,
  productListView
}