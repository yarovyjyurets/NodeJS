const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const Products = require('./products');

const CART_PATH = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);
const defaultCartData = { products: {}, totalPrice: 0 };
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

const getCart = async () => {
  const products = await Products.getAll();
  const cart = await readFile(CART_PATH);
  const productsInCart = products
    .filter(p => cart.products[p.id])
    .map(p => ({ ...p, qty: cart.products[p.id].qty }))
  const totalPirce = productsInCart.reduce((acc, p) => {
    return acc += p.price * cart.products[p.id].qty;
  }, 0);

  return { products: productsInCart, totalPirce };
};

const addProduct = async (productId) => {
  const cart = await readFile(CART_PATH);
  const existingProduct = cart.products[productId];
  if (existingProduct) {
    existingProduct.qty += 1;
  } else {
    cart.products[productId] = { qty: 1 };
  }
  return writeFile(CART_PATH, cart);
};

const deleteProduct = async (productId) => {
  const cart = await readFile(CART_PATH);
  delete cart.products[productId];
  return writeFile(CART_PATH, cart);
};


module.exports = {
  getCart,
  addProduct,
  deleteProduct,
}