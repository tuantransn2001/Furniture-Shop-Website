import React, { useEffect, useRef } from "react";

import Button from "~/components/helpers/Button/Button";
import CartList from "~/components/CartList/CartList";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DISPLAY_CART_MODAL } from "~/redux/constants/CartConstants/CartConstants";
import { handleCalculateSubtotal } from "~/common/common";
import classNames from "classnames/bind";
import style from "./CartWithProductInfo.module.scss";
const cx = classNames.bind(style);

const CartWithProductInfo = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const viewBasketBtnRef = useRef(null);

  const cartList = useSelector((state) => state.CartReducer.cartList);
  const subTotal = handleCalculateSubtotal(cartList);

  useEffect(() => {
    const viewBasketBtnEl = viewBasketBtnRef.current;
    viewBasketBtnEl &&
      viewBasketBtnEl.addEventListener("click", (e) => {
        navigate("/home/basket");
        dispatch({
          type: DISPLAY_CART_MODAL,
          payload: {
            userAction: "hide",
          },
        });
      });
  }, []);

  return (
    <div className="grid">
      <div className="row">
        <div className="c-12 gutter">
          <div className={cx("cart-total-wrapper")}>
            <span className={cx("paragraph-text-style-strong")}>Subtotal:</span>
            <span className={cx("paragraph-text-style")}>£ {subTotal}</span>
          </div>
        </div>
      </div>

      <div className="row mt-1">
        <div className="c-12 gutter">
          <div className={cx("cart-buttons")}>
            <Button
              size="medium"
              type="view-basket"
              maxSize
              ref={viewBasketBtnRef}
            >
              View Basket
            </Button>
            <Button background="red" size="medium" type="primary" maxSize>
              Checkout
            </Button>
          </div>
        </div>
      </div>

      <CartList />
    </div>
  );
};

export default CartWithProductInfo;
