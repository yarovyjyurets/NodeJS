const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const CART_PATH = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);
const defaultCartData = { products: [], totalPrice: '0' };
const writeFile = async (...args) => {
  const [path, data, ...rest] = args;
  await promisify(fs.writeFile).call(null, path, JSON.stringify(data), ...rest);
  return data;
};
const readFile = (...args) => {
  return promisify(fs.readFile).call(null, ...args)
    .then(rawData => JSON.parse(rawData))
    .catch(async (e) => {
      if (e.code === 'ENOENT') {
        await writeFile(CART_PATH, JSON.stringify(defaultCartData));
        return defaultCartData;
      } else {
        throw e;
      }
    })
}

const getCart = () => readFile(CART_PATH);

const addProduct = async (product) => {
  const cart = await readFile(CART_PATH);
  const existingProduct = cart.products.find(p => p.id === product.id);
  if (existingProduct) {
    existingProduct.qty += 1;
    cart.totalPrice = Number(cart.totalPrice) + Number(existingProduct.price);
  } else {
    product.qty = 1;
    cart.products.push(product);
    cart.totalPrice = Number(cart.totalPrice) + Number(product.price);
  }
  return writeFile(CART_PATH, cart);
};


module.exports = {
  getCart,
  addProduct
}