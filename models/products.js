const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const PRODUCTS_PATH = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);
const DEFAULT_PRODUCTS = [];
const saveProducts = async products => {
  await promisify(fs.writeFile).call(null, PRODUCTS_PATH, JSON.stringify(products));
  return products;
};
const readFile = (...args) => {
  return promisify(fs.readFile).call(null, ...args)
    .then(rawData => JSON.parse(rawData))
    .catch(async (e) => {
      if (e.code === 'ENOENT') {

        await saveProducts(DEFAULT_PRODUCTS);
        return DEFAULT_PRODUCTS;
      } else {
        throw e;
      }
    })
}

const getAll = () => readFile(PRODUCTS_PATH);

const addProduct = async (product) => {
  const products = await readFile(PRODUCTS_PATH);
  product.id = Math.ceil(Math.random() * 100).toString();
  products.push(product);
  return saveProducts(products);
};

const getProductById = async (id) => {
  const products = await readFile(PRODUCTS_PATH);
  const product = products.find(p => p.id === id);

  return product;
};

const updateProductById = async (id, product) => {
  const products = await readFile(PRODUCTS_PATH);
  const indexForUpdatedProduct = products.findIndex(p => p.id === id);
  if (!~indexForUpdatedProduct) {
    console.warn(`Car by ID: ${id} not found for update!`);
    return;
  }
  products[indexForUpdatedProduct] = { ...product, id };
  return saveProducts(products);
};

const removeProductById = async (id) => {
  const products = await readFile(PRODUCTS_PATH);
  const indexForRemoveProduct = products.findIndex(p => p.id === id);
  if (!~indexForRemoveProduct) {
    console.warn(`Car by ID: ${id} not found for delete!`);
    return;
  }
  products.splice(indexForRemoveProduct, 1);
  return saveProducts(products);
};

module.exports = {
  getAll,
  addProduct,
  getProductById,
  updateProductById,
  removeProductById,
}