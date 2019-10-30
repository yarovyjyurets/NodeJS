module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
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

  Cart.associate = (db) => {
    db.Cart.belongsTo(db.Product, {
      foreignKey: 'productId',
      targetKey: 'id'
    })
  };

  return Cart;
}