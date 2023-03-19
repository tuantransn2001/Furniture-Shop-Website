import React, { useState, useEffect, useRef } from "react";
import Button from "~/components/helpers/Button/Button";

import { reloadPage } from "~/common/common";
import { fetchApi } from "~/services/utils/fetch";
import { useSelector, useDispatch } from "react-redux";
import { DISPLAY_CART_MODAL } from "~/redux/constants/CartConstants/CartConstants";
const AddProductButton = (props) => {
  const dispatch = useDispatch();
  const addProductButtonRef = useRef(null);
  const [buttonStatus, setButtonStatus] = useState(null);

  const currentProductOnClick = useSelector(
    (state) => state.CartReducer.currentProductDetail
  );

  const handleAddProductToCart = async () => {
    setButtonStatus("loading");

    const fetchResultData = await fetchApi.post("/shopping-cart", {
      product_id: currentProductOnClick.id,
      shopping_cart_id: 1,
      unit_price: currentProductOnClick.product_price,
    });

    const isFetchSuccess = fetchResultData.status === 200;
    if (isFetchSuccess) {
      // ? add cart item

      reloadPage();
      // ? Show Basket slide
      dispatch({
        type: DISPLAY_CART_MODAL,
        payload: { userAction: "show" },
      });
      setButtonStatus("success");
    } else {
      setButtonStatus("fail");
    }
  };
  useEffect(() => {
    const addProductButtonEl = addProductButtonRef.current;

    addProductButtonEl &&
      addProductButtonEl.addEventListener("click", handleAddProductToCart);

    return () => {
      addProductButtonEl &&
        addProductButtonEl.removeEventListener("click", handleAddProductToCart);
    };
  }, []);

  return (
    <>
      <Button
        type="primary"
        size="medium"
        status={buttonStatus}
        maxSize
        ref={addProductButtonRef}
      >
        Add to basket
      </Button>
    </>
  );
};

export default AddProductButton;
