import React from "react";
import Page from "~/components/helpers/Page/Page";
import CartInfo from "./CartInfo/CartInfo";
import CheckoutReview from "./CheckoutReview/CheckoutReview";
import classNames from "classnames/bind";
import style from "./BasketInfo.module.scss";
const cx = classNames.bind(style);

const BasketInfoPage = (props) => {
  return (
    <Page title="Complete your order">
      <div className="grid wide">
        <div className="row">
          <div className="c-7 gutter">
            <CartInfo />
          </div>
          <div className="c-1 gutter"></div>
          <div className="c-4 gutter">
            <CheckoutReview />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default BasketInfoPage;
