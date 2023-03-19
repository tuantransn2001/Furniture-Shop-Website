import React from "react";

import Button from "~/components/helpers/Button/Button";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { fetchApi } from "~/services/utils/fetch";
import { useDispatch } from "react-redux";
import { UPDATE_CART_ITEM_QUANTITY } from "~/redux/constants/CartConstants/CartConstants";
import classNames from "classnames/bind";
import style from "./QuantityPicker.module.scss";
const cx = classNames.bind(style);

const buttonCustomStyle = {
  fontSize: "11px",
  color: "#272525",
};

const QuantityPicker = (props) => {
  const { quantity, id } = props;
  const dispatch = useDispatch();
  const handleUpdateQuantity = (direction) => {
    fetchApi.put(`/shopping-cart/${direction}/${id}`).then((response) => {
      if (response.status === 201) {
        dispatch({
          type: UPDATE_CART_ITEM_QUANTITY,
          payload: {
            cartItemUpdate: response.data.data,
          },
        });
      }
    });
  };

  return (
    <div className={cx("quantity-picker-wrapper")}>
      <Button
        ghost
        customStyle={buttonCustomStyle}
        icon={faMinus}
        onClick={() => {
          handleUpdateQuantity("minus");
        }}
      />
      <span>{quantity}</span>
      <Button
        ghost
        customStyle={buttonCustomStyle}
        icon={faPlus}
        onClick={() => {
          handleUpdateQuantity("plus");
        }}
      />
    </div>
  );
};

export default QuantityPicker;
