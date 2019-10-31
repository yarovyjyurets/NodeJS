const db = require('../db');
const { modelNames } = require('../db/constants');


const getCartForUser = async (user) => {
  const cart = await user.getCart();
  const productsInCart = await cart.getProducts();

  return { products: productsInCart, totalPirce: 0 };
};

const addProduct = async (productId, cart) => {
  const [productInCart] = await cart.getProducts({ where: { id: productId } });
  if (productInCart) {
    await cart.addProduct(productInCart, { through: { qty: productInCart.CartItem.qty + 1 } });
  } else {
    const product = await db[modelNames.PRODUCT].findByPk(productId);
    await cart.addProduct(product, { through: { qty: 1 } });
  }
}

const deleteProduct = async (productId, cart) => {
  const [productForRemove] = await cart.getProducts({ where: { id: productId } });
  await cart.removeProducts(productForRemove);
};


module.exports = {
  getCartForUser,
  addProduct,
  deleteProduct,
}