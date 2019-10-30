const db = require('../db');

const getAll = () => db.Products.findAll();
const addProduct = (product) => db.Products.create(product);
const getProductById = (id) => db.Products.findByPk(id);
const updateProductById = (id, product) => db.Products.update(product, { where: { id } });
const removeProductById = (id) => db.Products.destroy({ where: { id } });

module.exports = {
  getAll,
  addProduct,
  getProductById,
  updateProductById,
  removeProductById,
}