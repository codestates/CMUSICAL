'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.users.belongsToMany(models.comment, { through: 'likes', foreignKey: 'userId' });
      models.users.belongsToMany(models.items, { through: 'favorites', foreignKey: 'userId', sourceKey: 'id' });

      models.users.hasMany(models.comment, { foreignKey: 'userId', sourceKey: 'id', onDelete: 'cascade' });
      // define association here
    }
  }
  users.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'users',
      // timestamps: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  );
  return users;
};
