const express = require("express");
const orderDetailRouter = express.Router();
const OrderDetailController = require("../controllers/order_detail-controller");

orderDetailRouter.get("/", OrderDetailController.getOderDetailList);
orderDetailRouter.get(
  "/check_promo/:promo",
  OrderDetailController.validateUserPromo
);

orderDetailRouter.post("/create-order", OrderDetailController.createOrder);

module.exports = { orderDetailRouter };
