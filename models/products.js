const db = require('../db');

const getAll = () => db.Product.findAll();
const addProduct = (product) => db.Product.create(product);
const getProductById = (id) => db.Product.findByPk(id);
const updateProductById = (id, product) => db.Product.update(product, { where: { id } });
const removeProductById = (id) => db.Product.destroy({ where: { id } });

module.exports = {
  getAll,
  addProduct,
  getProductById,
  updateProductById,
  removeProductById,
}