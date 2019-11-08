const Products = require('../models/products');

const addProductView = (req, res) => {
  return res.render('admin/edit-product', {
    pageTitle: 'Add product',
    path: req.fullPath,
    editMode: false,
    isAuthenticated: req.session.isAuthenticated
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
    path: req.fullPath,
    isAuthenticated: req.session.isAuthenticated
  });
}

const editProductView = async (req, res) => {
  const product = await Products.getProductById(req.params.productId);
  return res.render('admin/edit-product', {
    pageTitle: 'Admin edit product',
    path: req.fullPath,
    editMode: true,
    product,
    isAuthenticated: req.session.isAuthenticated
  });
}

const editProductAPI = async (req, res) => {
  await Products.updateProductById(req.params.productId, req.body);
  res.redirect('/admin/product-list');
}

const deleteProductAPI = async (req, res) => {
  await Products.removeProductById(req.params.productId);
  res.redirect('/admin/product-list');
}

module.exports = {
  addProductView,
  addProductAPI,
  productListView,
  editProductView,
  editProductAPI,
  deleteProductAPI
}