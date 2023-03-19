import React from "react";
import Button from "~/components/helpers/Button/Button";
import PaymentMethod from "~/components/helpers/PaymentMethod/PaymentMethod";
import { handleCalculateSubtotal } from "~/common/common";
import { useSelector } from "react-redux";

import classNames from "classnames/bind";
import style from "./CheckoutOrderReview.module.scss";
const cx = classNames.bind(style);

const CheckoutOrderReview = (props) => {
  const {
    title,
    action,
    actionHandler,
    isIncludesCartItem,
    customStyle,
    getUserPayment,
  } = props;
  const cartList = useSelector((state) => state.CartReducer.cartList);
  const cartSubTotal = handleCalculateSubtotal(cartList);

  const renderTableBody = () => {
    return (
      isIncludesCartItem &&
      cartList.map((cartItem) => {
        const product_subtotal = cartItem.unit_price * cartItem.quantity;

        return (
          <tr key={cartItem.cart_item_id}>
            <td className={cx("default-text")}>{cartItem.product_name}</td>
            <td className={cx("default-text")}>${product_subtotal}</td>
          </tr>
        );
      })
    );
  };

  return (
    <div style={customStyle} className={cx("checkout-order-review-wrapper")}>
      {title && <h2 className="h4-size-default flex-center">{title}</h2>}

      <table>
        {isIncludesCartItem && (
          <thead>
            <tr>
              <th className={cx("strong-text")}>Product</th>
              <th className={cx("strong-text")}>Subtotal</th>
            </tr>
          </thead>
        )}
        <tbody>
          {renderTableBody()}
          <tr>
            <td className={cx("default-text-1")}>Subtotal</td>
            <td className={cx("default-text-1")}>${cartSubTotal}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <div className={cx("footer-shipping-options-wrapper")}>
                <span className={cx("default-text")}> Shipping</span>
                <span className={cx("default-text")}>
                  Enter your address to view shipping options!
                </span>
                <a
                  style={{
                    textDecoration: "underline",
                    color: "#272525",
                  }}
                  href="#"
                >
                  Calculate shipping
                </a>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
      <div className={cx("cart-total-wrapper")}>
        <span className={cx("strong-text-1")}>Total</span>
        <span className={cx("default-text-1")}>
          {`$ ${cartSubTotal}`}
          <span className={cx("default-text")}>{` (Include: $${
            cartSubTotal * 0.2
          } VAT)`}</span>
        </span>
      </div>
      <PaymentMethod
        optionColumn={12}
        getUserPayment={getUserPayment}
        optionList={[
          {
            type: "Cash",
            benefit: "Pay 25% deposit",
          },
          {
            type: "Apple Pay",
          },
          {
            type: "Google Pay",
          },
        ]}
      />
      <div className={cx("policy-and-term-wrapper")}>
        <div className="grid">
          <div className="row">
            <div className="c-12 gutter mb-1">
              <div className={cx("policy-and-term-item-wrapper")}>
                <span className={cx("input-checkbox-wrapper")}>
                  <input type="checkbox" />
                </span>
                <span>
                  I have read and agree to the website terms and conditions
                  <span>*</span>
                </span>
              </div>
            </div>
            <div className="c-12 gutter">
              <div className={cx("policy-and-term-item-wrapper")}>
                <span className={cx("input-checkbox-wrapper")}>
                  <input type="checkbox" />
                </span>
                <span>
                  Sign me up to receive exclusive discounts and latest offers
                  from Lenleys. See our privacy policy for details.
                </span>
              </div>
            </div>
          </div>
        </div>

        <Button type="primary" size="medium" maxSize onClick={actionHandler}>
          {action || "Checkout"}
        </Button>
      </div>
    </div>
  );
};

export default CheckoutOrderReview;
