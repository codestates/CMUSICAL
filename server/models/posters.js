'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.posters.belongsTo(models.items, { foreignKey: 'itemId', sourceKey: 'id' });
      // define association here
    }
  }
  posters.init(
    {
      poster: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'posters',
      // timestamps: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  );
  return posters;
};
