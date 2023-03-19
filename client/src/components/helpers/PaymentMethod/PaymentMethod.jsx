import React, { useRef, useState, useEffect } from "react";

import Tooltip from "~/components/helpers/Tooltip/Tooltip";

import classNames from "classnames/bind";
import style from "./PaymentMethod.module.scss";
const cx = classNames.bind(style);

const PaymentMethod = (props) => {
  const { optionColumn, optionList, getUserPayment } = props;
  const paymentOptionRef = useRef([]);
  const [indexActive, setIndexActive] = useState(null);

  useEffect(() => {
    const paymentOptionEls = paymentOptionRef.current;

    paymentOptionEls &&
      paymentOptionEls.map((el, index) => {
        el &&
          el.addEventListener("click", (e) => {
            setIndexActive(index);
            getUserPayment((prev) => {
              return {
                ...prev,
                type: e.target.id,
              };
            });
          });
      });
  }, []);

  const renderOptions = () => {
    return optionList.map((paymentOption, index) => {
      return (
        <div
          className={`c-${optionColumn ? optionColumn : 6} gutter mb-1`}
          key={paymentOption.type}
        >
          {paymentOption.benefit ? (
            <Tooltip placement="left" promptText={paymentOption.benefit}>
              <label
                htmlFor={paymentOption.type}
                className={cx("payment-option")}
                ref={(el) => {
                  paymentOptionRef.current.push(el);
                }}
              >
                <input
                  type="radio"
                  id={paymentOption.type}
                  checked={indexActive === index}
                />
                <span>{paymentOption.type}</span>
              </label>
            </Tooltip>
          ) : (
            <label
              htmlFor={paymentOption.type}
              className={cx("payment-option")}
              ref={(el) => {
                paymentOptionRef.current.push(el);
              }}
            >
              <input
                type="radio"
                id={paymentOption.type}
                checked={indexActive === index}
              />
              <span>{paymentOption.type}</span>
            </label>
          )}
        </div>
      );
    });
  };

  return (
    <div className={`${cx("payment-options-wrapper")} grid`}>
      <div className="row">{renderOptions()}</div>
    </div>
  );
};
export default PaymentMethod;
