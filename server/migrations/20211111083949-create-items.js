'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      thumbnail: {
        type: Sequelize.STRING
      },
      theater: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      cast: {
        type: Sequelize.STRING
      },
      runtime: {
        type: Sequelize.STRING
      },
      showtime: {
        type: Sequelize.STRING
      },
      date_from: {
        type: Sequelize.STRING
      },
      date_to: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('items');
  }
};