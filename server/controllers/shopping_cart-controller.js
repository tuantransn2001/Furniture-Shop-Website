const { Shopping_cart_item } = require("../models");
const { sequelize } = require("../models");

const getCartListSqlQuery = `
select 
	shopping_cart_items.id as cart_item_id,
    products.id as product_id,
    products.product_name,
    products.product_category,
    products.product_imgSrc,
    shopping_cart_items.unit_price,
    shopping_cart_items.quantity
 from lenleys_database.shopping_carts
right join lenleys_database.shopping_cart_items
on shopping_carts.id = shopping_cart_items.shopping_cart_id
right join lenleys_database.products
on shopping_cart_items.product_id = products.id
where shopping_cart_items.id is not null
`;

class ShoppingCartController {
  static async getCartList(req, res) {
    try {
      const [cartList, metaData] = await sequelize.query(getCartListSqlQuery);
      res.status(200).send(cartList);
      return cartList;
    } catch (err) {
      res.status(500).send(err);
      return -1;
    }
  }
  static async deleteAll(req, res) {
    try {
      await Shopping_cart_item.destroy({
        where: {},
        truncate: true,
      });
      res.status(200).send("Delete success !");
    } catch (err) {
      res.status(500).send(err);
    }
  }
  static async deleteById(req, res) {
    try {
      const { id } = req.params;

      const targetCartItem = await Shopping_cart_item.findOne({
        where: { id },
      });

      if (targetCartItem) {
        await Shopping_cart_item.destroy({
          where: {
            id,
          },
        });

        res.status(201).send({
          status: "success",
          message: `Delete success product with id: ${id}`,
        });
      } else {
        res.status(404).send({
          status: "err",
          message: `Product with id: ${id} not found !! Pls check it and try again`,
        });
      }
    } catch (err) {
      res.status(500).send({
        status: "err",
        message: err,
      });
    }
  }
  static async addCartItem(req, res) {
    try {
      const { product_id, shopping_cart_id, unit_price } = req.body;
      // ? Check product is already exist or not
      const foundProduct = await Shopping_cart_item.findOne({
        where: {
          product_id,
        },
      });

      if (foundProduct) {
        // ? Already exist -> Plus quantity
        foundProduct.quantity = foundProduct.quantity += 1;
        await foundProduct.save();
        res.status(200).send({
          status: "success",
          data: foundProduct,
          message:
            "You are already have this in your basket ! we added one more kind of product for you!",
        });
      } else {
        // ! Didn't already exist -> Add new
        const newProductItem = {
          product_id,
          shopping_cart_id,
          unit_price,
          quantity: 1,
        };

        await Shopping_cart_item.create(newProductItem);

        res.status(200).send({
          status: "success",
          message: "Add product success!",
          data: newProductItem,
        });
      }
    } catch (err) {
      res.status(500).send({
        status: "error",
        message: err,
      });
    }
  }
  static async updateQuantity(req, res) {
    try {
      const { direction, id } = req.params;

      const targetProduct = await Shopping_cart_item.findOne({
        where: {
          id,
        },
      });

      if (direction === "minus") {
        // ? Minus
        await targetProduct.update({
          quantity:
            targetProduct.quantity <= 1 ? 1 : (targetProduct.quantity -= 1),
        });
      } else if (direction === "plus") {
        // ? Plus
        await targetProduct.update({
          quantity:
            targetProduct.quantity >= 10 ? 10 : (targetProduct.quantity += 1),
        });
      }
      await targetProduct.save();

      res.status(201).send({
        status: "success",
        data: targetProduct,
      });
    } catch (err) {
      res.status(500).send({
        status: "error",
        message: err,
      });
    }
  }
}

module.exports = ShoppingCartController;
