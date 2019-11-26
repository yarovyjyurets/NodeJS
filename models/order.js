const db = require('../db');
const { modelNames } = require('../db/constants');
const { getShopDb } = require('../mongDB');
const { ObjectId } = require('mongodb');


let getAll;
let create;
let getById;

if (process.env.DB === 'SQL') {
  getAll = async (user) => user.getOrders({ include: [db[modelNames.PRODUCT]] });

  create = async (user, cart) => {
    const productsInCart = await cart.getProducts();
    const order = await user.createOrder();
    const mappedProductsForOrder = productsInCart.map(p => {
      p.OrderItem = { qty: p.CartItem.qty };
      return p;
    });

    await order.addProducts(mappedProductsForOrder);
    await cart.setProducts(null);
  }
} else {
  getAll = async (user) => {
    const shopDB = getShopDb();
    return shopDB.collection('orders').find({'userInfo.userId': user._id.toString()}).toArray();
  }
  create = async (user, cart) => {
    const shopDB = getShopDb();
    const productIds = user.cart.products.map(p => new ObjectId(p.productId));
    const products = await shopDB.collection('products').find({ _id: { $in: productIds } }).toArray();
    const mappedProducts = products.map(({ title, _id, price, imageUrl, description }) => ({
      title,
      price,
      imageUrl,
      description,
      _id: _id.toString(),
      qty: user.cart.products.find(p => _id.toString() === p.productId).qty
    }));
    const totalPrice = mappedProducts.reduce((acc, { price, qty }) => acc + (Number(price) * qty), 0);
    const userInfo = {
      userId: user._id.toString(),
      userEmail: user.email,
    }
    const order = { Products: mappedProducts, totalPrice, userInfo };
    await shopDB.collection('orders').insertOne(order);
    const emptyCart = { $set: { cart: { products: [] } } };
    await shopDB.collection('user').updateOne({ _id: user._id }, emptyCart);
  }
  getById = async (id) => {
    const shopDB = getShopDb();
    return shopDB.collection('orders').findOne({ _id: new ObjectId(id) });
  }
}

module.exports = {
  create,
  getAll,
  getById,
}