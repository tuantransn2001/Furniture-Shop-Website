import React, { useEffect } from "react";

import EmptyCartContent from "./EmptyCartContent/EmptyCartContent";
import CartWithProductInfo from "./CartWithProductInfo/CartWithProductInfo";
import Button from "~/components/helpers/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { fetchApi } from "~/services/utils/fetch";
import { DISPLAY_CART_MODAL } from "~/redux/constants/CartConstants/CartConstants";
import { useSelector, useDispatch } from "react-redux";

import classNames from "classnames/bind";
import style from "./ShoppingBasket.module.scss";
import { SET_CART_LIST } from "~/redux/constants/CartConstants/CartConstants";

const cx = classNames.bind(style);
const ShoppingCart = (props) => {
  const dispatch = useDispatch();
  useSetCartList(dispatch);
  const cartList = useSelector((state) => state.CartReducer.cartList);
  const isCartModalOn = useSelector((state) => state.CartReducer.isCartModalOn);

  const renderCartSection = () => {
    const isCartEmpty = cartList.length === 0;
    if (isCartEmpty) {
      return <EmptyCartContent />;
    }
    return <CartWithProductInfo />;
  };

  return (
    <div
      className={cx("cart-sidebar-wrapper", {
        show: isCartModalOn,
      })}
    >
      <>
        <header className={cx("cart-sidebar-header")}>
          <>
            <h1 className={cx("cart-sidebar-title")}>Shopping Basket</h1>
            <span className={`${cx("shop-cart-count")} flex-center`}>
              {cartList.length}
            </span>
          </>
          <Button
            type="close-shopping-basket"
            size={null}
            ghost
            onClick={(e) => {
              dispatch({
                type: DISPLAY_CART_MODAL,
                payload: {
                  userAction: "hide",
                },
              });
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </Button>
        </header>
        <section className={cx("cart-slider-body")}>
          {renderCartSection()}
        </section>
      </>
    </div>
  );
};

const useSetCartList = (dispatch) => {
  useEffect(() => {
    fetchApi.get("shopping-cart").then((response) => {
      dispatch({
        type: SET_CART_LIST,
        payload: {
          data: response.data,
        },
      });
    });
  }, []);
};

export default ShoppingCart;
