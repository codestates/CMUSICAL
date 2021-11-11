'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.comment.belongsToMany(models.users, { through: 'likes' });

      models.comment.belongsTo(models.users);
      models.comment.belongsTo(models.items);
      // define association here
    }
  }
  comment.init(
    {
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'comment',
    }
  );
  return comment;
};
