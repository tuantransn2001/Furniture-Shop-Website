import React from "react";
import Button from "~/components/helpers/Button/Button";
import ShoppingBasket from "../ShoppingBasket/ShoppingBasket";
import { cartIcon } from "~/components/Img/Img";

import { DISPLAY_CART_MODAL } from "~/redux/constants/CartConstants/CartConstants";
import { useSelector, useDispatch } from "react-redux";

const btnWrapper = {
  position: "relative",
};
const btnAmount = {
  position: "absolute",
  top: 0,
  right: 0,
  width: "20px",
  height: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  backgroundColor: "#c20114",
  color: "#ffffff",
  fontSize: "11px",
  fontWeight: 600,
};

const CartBtn = (props) => {
  const cartList = useSelector((state) => state.CartReducer.cartList);
  const dispatch = useDispatch();
  return (
    <>
      <div style={btnWrapper}>
        <Button
          type="widget-elementor"
          ghost
          size={null}
          onClick={(e) => {
            dispatch({
              type: DISPLAY_CART_MODAL,
              payload: {
                userAction: "show",
              },
            });
          }}
        >
          {cartIcon()}
        </Button>
        <span style={btnAmount}>{cartList.length}</span>
      </div>
      <ShoppingBasket />
    </>
  );
};
export default CartBtn;
