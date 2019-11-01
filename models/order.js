const db = require('../db');
const { modelNames } = require('../db/constants');

const getAll = async (user) => user.getOrders({ include: [db[modelNames.PRODUCT]] });

const create = async (user, cart) => {
  console.log('CREATE order')
  const productsInCart = await cart.getProducts();
  const order = await user.createOrder();
  const mappedProductsForOrder = productsInCart.map(p => {
    p.OrderItem = { qty: p.CartItem.qty };
    return p;
  });

  await order.addProducts(mappedProductsForOrder);
  await cart.setProducts(null);
}

module.exports = {
  create,
  getAll,
}