const { modelNames: { CART } } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(CART, {
    // attributes
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    // options
  });

  return Cart;
}