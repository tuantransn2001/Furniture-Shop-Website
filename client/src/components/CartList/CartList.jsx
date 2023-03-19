import React from "react";
import QuantityPicker from "~/components/helpers/QuantityPicker/QuantityPicker";
import DeleteCartItemButton from "~/components/helpers/DeleteCartItemButton/DeleteCartItemButton";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames/bind";
import style from "./CartList.module.scss";
const cx = classNames.bind(style);

const CartList = (props) => {
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.CartReducer.cartList);

  return (
    <div className="row mt-2">
      {cartList.map((productItem) => {
        return (
          <div className="c-12 gutter" key={productItem.cart_item_id}>
            <div className={cx("cart-item-card-wrapper")}>
              <a href="#" className={cx("cart-item-img-wrapper")}>
                <img
                  src={productItem.product_imgSrc}
                  alt={productItem.product_name}
                />
              </a>

              <div className={cx("cart-item-content")}>
                <div className={cx("cart-item-content-top")}>
                  <span className={cx("product-name")}>
                    {productItem.product_name}
                  </span>
                  <span className={cx("product-desc")}>medium</span>
                  <span className={cx("product-desc")}>
                    {productItem.product_category}
                  </span>
                </div>
                <div className={cx("cart-item-content-bottom")}>
                  <QuantityPicker
                    quantity={productItem.quantity}
                    id={productItem.cart_item_id}
                  />
                  <span className={cx("cart-item-total")}>{`£ ${
                    productItem.quantity * 1 * (productItem.unit_price * 1)
                  }`}</span>
                </div>
              </div>

              <DeleteCartItemButton cart_item_id={productItem.cart_item_id} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartList;
