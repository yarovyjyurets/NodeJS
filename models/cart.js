const db = require('../db');
const { modelNames } = require('../db/constants');
const { getShopDb } = require('../mongDB');
const { ObjectId } = require('mongodb');

let getCartForUser;
let addProduct;
let deleteProduct;

if (process.env.DB === 'SQL') {
  getCartForUser = async (user) => {
    const cart = await user.getCart();
    const productsInCart = await cart.getProducts();
    const totalPrice = productsInCart.reduce((acc, p) => acc + (Number(p.price) * p.CartItem.qty), 0)

    return { products: productsInCart, totalPrice };
  };

  addProduct = async (productId, cart) => {
    const [productInCart] = await cart.getProducts({ where: { id: productId } });
    if (productInCart) {
      await cart.addProduct(productInCart, { through: { qty: productInCart.CartItem.qty + 1 } });
    } else {
      const product = await db[modelNames.PRODUCT].findByPk(productId);
      await cart.addProduct(product, { through: { qty: 1 } });
    }
  }

  deleteProduct = async (productId, cart) => {
    const [productForRemove] = await cart.getProducts({ where: { id: productId } });
    await cart.removeProducts(productForRemove);
  };
} else {
  getCartForUser = async (user) => {
    const shopDB = getShopDb()
    const productIds = user.cart.products.map(p => new ObjectId(p.productId));
    const products = await shopDB.collection('products').find({ _id: { $in: productIds } }).toArray();
    const mappedProducts = products.map(({ title, _id, price }) => ({
      title,
      price,
      id: _id.toString(),
      qty: user.cart.products.find(p => _id.toString() === p.productId).qty
    }));
    const totalPrice = mappedProducts.reduce((acc, { price, qty }) => acc + (Number(price) * qty), 0);
    return { products: mappedProducts, totalPrice };
  };

  addProduct = async (productId, cart, user) => {
    const shopDB = getShopDb();
    const producIndextInCart = await cart.products.findIndex(el => el.productId === productId);
    if (~producIndextInCart) {
      cart.products[producIndextInCart].qty += 1;
      await shopDB.collection('user').updateOne({ _id: user._id }, { $set: { cart } });
    } else {
      cart.products.push({ productId, qty: 1 });
      await shopDB.collection('user').updateOne({ _id: user._id }, { $set: { cart } });
    }
  }

  deleteProduct = async (productId, cart, user) => {
    const shopDB = getShopDb();
    await shopDB.collection('user').updateOne(
      { _id: user._id },
      { $pull: { 'cart.products': { productId } } }
    );
  };
}



module.exports = {
  getCartForUser,
  addProduct,
  deleteProduct,
}