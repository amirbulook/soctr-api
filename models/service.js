"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Service.hasMany(models.Comment, {
        foreignKey: "service_id",
      });
    }
  }
  Service.init(
    {
      title: DataTypes.STRING,
      picture: DataTypes.STRING,
      detail: DataTypes.STRING,
      type: DataTypes.ENUM("hotel", "tourismPlace", "agnecy", "resturant"),
    },
    {
      sequelize,
      modelName: "Service",
    }
  );
  return Service;
};
