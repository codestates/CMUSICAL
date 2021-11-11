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
      models.items.belongsToMany(models.users, { through: 'favorites' });

      models.items.hasMany(models.comment, { foreignKey: 'itemId' });
      models.items.hasMany(models.posters, { foreignKey: 'itemId' });
      // define association here
    }
  }
  items.init(
    {
      title: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      theater: DataTypes.STRING,
      price: DataTypes.STRING,
      cast: DataTypes.STRING,
      runtime: DataTypes.STRING,
      showtime: DataTypes.STRING,
      date_from: DataTypes.STRING,
      date_to: DataTypes.STRING,
      state: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'items',
    }
  );
  return items;
};
