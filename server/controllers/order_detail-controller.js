const {
  Order_detail,
  Promo,
  Shopping_cart,
  Shopping_cart_item,
  sequelize,
} = require("../models");
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
class OrderDetailController {
  static async getOderDetailList(req, res) {
    try {
      const order_detail_list = await Order_detail.findAll();
      res.status(200).send(order_detail_list);
    } catch (err) {
      res.status(500).send(err);
    }
  }
  static async validateUserPromo(req, res) {
    try {
      const { promo } = req.params;

      const foundPromo = await Promo.findOne({
        where: {
          promo_code: promo,
        },
      });

      if (foundPromo) {
        res.status(200).send(foundPromo);
      } else {
        res
          .status(404)
          .send(
            "Your Promo is invalid or out date please check it and try it again"
          );
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
  static async createOrder(req, res) {
    try {
      const {
        firstName,
        lastName,
        phoneNumber,
        email,
        address,
        note,
        discount_price,
        userPayment,
      } = req.body;

      const [cartList, metaData] = await sequelize.query(getCartListSqlQuery);

      console.log(cartList);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = OrderDetailController;
