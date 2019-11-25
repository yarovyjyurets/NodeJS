const Products = require('../models/products');
const { deleteFile } = require('../util');

const addProductView = (req, res) => {
  return res.render('admin/edit-product', {
    pageTitle: 'Add product',
    editMode: false,
  });
}

const addProductAPI = async (req, res) => {
  const { title, price, description } = req.body;

  if (!req.file) {
    req.flash('warn', 'File is invalid');
    return res.redirect('add-product');
  }

  const newProduct = {
    title,
    price,
    description,
    imageUrl: `/${req.file.filename}`
  }
  await Products.addProduct(newProduct, req.user);

  return res.redirect('/');
}

const productListView = async (req, res) => {
  const products = await Products.getAllByUser(req.user);
  return res.render('admin/product-list', {
    pageTitle: 'Admin product list',
    products,
  });
}

const editProductView = async (req, res) => {
  const product = await Products.getProductById(req.params.productId);
  return res.render('admin/edit-product', {
    pageTitle: 'Admin edit product',
    editMode: true,
    product,
  });
}

const editProductAPI = async (req, res) => {
  const updateProductInfo = req.body;
  if (req.file) {
    updateProductInfo.imageUrl = `/${req.file.filename}`;
    const oldProduct = await Products.getProductById(req.params.productId);
    deleteFile(oldProduct.imageUrl);
  }
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