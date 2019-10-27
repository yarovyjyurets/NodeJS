const Products = require('../models/products');

const addProductView = (req, res) => {
  const path = req.baseUrl + req.path;
  console.log(`GET: ${path}`);
  return res.render('admin/add-product', {
    pageTitle: 'Add product',
    path 
  });
}

const addProductAPI = async (req, res) => {
  console.log('POST: <add-product>');
  console.dir(req.body, { colors: true, depth: 5 })
  await Products.addProduct(req.body);
  return res.redirect('/');
}

const productListView = async (req, res) => {
  const path = req.baseUrl + req.path;
  console.log(`GET: ${path}`);
  const products = await Products.getAll();
  return res.render('admin/product-list', {
    pageTitle: 'Admin product list',
    products,
    path
  });
}

module.exports = {
  addProductView,
  addProductAPI,
  productListView
}