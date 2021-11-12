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
      models.comment.belongsToMany(models.users, { through: 'likes', foreignKey: 'commentId', sourceKey: 'id' });

      models.comment.belongsTo(models.users, { foreignKey: 'userId', sourceKey: 'id' });
      models.comment.belongsTo(models.items, {});
      // define association here
    }
  }
  comment.init(
    {
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'comment',
      // timestamps: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  );
  return comment;
};
