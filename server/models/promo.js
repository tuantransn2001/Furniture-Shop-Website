"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Promo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Promo.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      promo_code: {
        type: DataTypes.STRING,
      },
      discount_price: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Promo",
    }
  );
  return Promo;
};
