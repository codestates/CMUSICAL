'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.items.belongsToMany(models.users, { through: 'favorites', foreignKey: 'itemId', sourceKey: 'id' });
      models.items.hasMany(models.comment, { foreignKey: 'itemId', sourceKey: 'id', onDelete: 'cascade' });
      // define association here
    }
  }
  items.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      theater: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cast: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      runtime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      showtime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateFrom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateTo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      poster: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'items',
      // timestamps: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  );
  return items;
};
