"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      Comment.belongsTo(models.Service, {
        foreignKey: "service_id",
      });
    }
  }
  Comment.init(
    {
      comment: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      service_id: DataTypes.INTEGER,
      rate: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
