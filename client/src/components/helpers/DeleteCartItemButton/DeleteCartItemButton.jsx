import React from "react";
import { fetchApi } from "~/services/utils/fetch";
import { DELETE_ITEM } from "~/redux/constants/CartConstants/CartConstants";
import Button from "~/components/helpers/Button/Button";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

const deleteItem = (id, dispatch) => {
  fetchApi.delete(`shopping-cart/by_id/${id}`).then((response) => {
    if (response.data.status === "success") {
      dispatch({
        type: DELETE_ITEM,
        payload: {
          id,
        },
      });
    }
  });
};

const DeleteCartItemButton = (props) => {
  const dispatch = useDispatch();
  return (
    <Button
      ghost
      icon={faXmark}
      onClick={(e) => {
        deleteItem(props.cart_item_id, dispatch);
      }}
      customStyle={{
        height: "max-content",
        fontSize: "11px",
        color: "#c20114",
      }}
    />
  );
};

export default DeleteCartItemButton;
