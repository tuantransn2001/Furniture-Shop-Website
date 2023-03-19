const express = require("express");
const shoppingCartRouter = express.Router();
const ShoppingCartController = require("../controllers/shopping_cart-controller");

shoppingCartRouter.get("/", ShoppingCartController.getCartList);
shoppingCartRouter.post("/", ShoppingCartController.addCartItem);
shoppingCartRouter.delete("/", ShoppingCartController.deleteAll);
shoppingCartRouter.delete("/by_id/:id", ShoppingCartController.deleteById);
shoppingCartRouter.put(
  "/:direction/:id",
  ShoppingCartController.updateQuantity
);
module.exports = { shoppingCartRouter };
