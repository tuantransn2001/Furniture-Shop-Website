"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order_detail.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      customer_firstName: {
        type: DataTypes.STRING,
      },
      customer_lastName: {
        type: DataTypes.STRING,
      },
      customer_phoneNumber: {
        type: DataTypes.STRING,
      },
      customer_email: {
        type: DataTypes.STRING,
      },
      customer_address: {
        type: DataTypes.STRING,
      },
      order_note: {
        type: DataTypes.STRING,
      },
      order_payment_type: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Order_detail",
    }
  );
  return Order_detail;
};
