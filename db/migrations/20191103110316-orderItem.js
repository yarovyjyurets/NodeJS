'use strict';
const { modelNames } = require('../constants')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(modelNames.ORDER_ITEM, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      qty: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      OrderId: {
        type: Sequelize.INTEGER,
        references: {
          model: modelNames.ORDER,
          key: 'id',
        },
      },
      ProductId: {
        type: Sequelize.INTEGER,
        references: {
          model: modelNames.PRODUCT,
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(modelNames.ORDER_ITEM);
  }
};
