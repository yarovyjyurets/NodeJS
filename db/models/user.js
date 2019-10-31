const { modelNames: { USER } } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(USER, {
    // attributes
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    // options
  });
}