const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const PRODUCTS_PATH = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getAll = async () => {
  const rawData = await readFile(PRODUCTS_PATH);
  const products = JSON.parse(rawData);
  return products;
};

const addProduct = async (product) => {
  const rawData = await readFile(PRODUCTS_PATH);
  const products = JSON.parse(rawData);
  product.id = Math.ceil(Math.random() * 100).toString();
  products.push(product);
  return writeFile(PRODUCTS_PATH, JSON.stringify(products));
};

const getProductById = async (id) => {
  const rawData = await readFile(PRODUCTS_PATH);
  const products = JSON.parse(rawData);
  const product = products.find(p => p.id === id);

  return product;
};

module.exports = {
  getAll,
  addProduct,
  getProductById
}