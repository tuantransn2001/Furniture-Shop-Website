import React, { useState } from "react";
import FormGroup from "~/components/helpers/FormGroup/FormGroup";
import Button from "~/components/helpers/Button/Button";
import DeleteCartItemButton from "~/components/helpers/DeleteCartItemButton/DeleteCartItemButton";
import { useSelector } from "react-redux";
import { trunc } from "~/common/common";
import classNames from "classnames/bind";
import style from "./CartInfo.module.scss";
import QuantityPicker from "../../../../components/helpers/QuantityPicker/QuantityPicker";
const cx = classNames.bind(style);
const CartTable = (props) => {
  const cartList = useSelector((state) => state.CartReducer.cartList);

  const tableHead = ["Product", "Price", "Quantity", "Subtotal"];

  const renderTableBodyRow = () => {
    return cartList.map((cartItem) => {
      return (
        <tr key={cartItem.cart_item_id}>
          <td>
            <div className={cx("cart-product-info")}>
              <DeleteCartItemButton cart_item_id={cartItem.cart_item_id} />
              <img src={cartItem.product_imgSrc} alt={cartItem.product_name} />
              <span>{trunc(cartItem.product_name, 40)}</span>
            </div>
          </td>
          <td>
            <span className={cx("strong-text")}>£{cartItem.unit_price}</span>
          </td>
          <td>
            <QuantityPicker
              quantity={cartItem.quantity}
              id={cartItem.cart_item_id}
            />
          </td>
          <td>
            <span className={cx("strong-text")}>
              {+cartItem.unit_price * cartItem.quantity}
            </span>
          </td>
        </tr>
      );
    });
  };

  const renderTableFooterRow = () => {
    return (
      <tr>
        <td>
          <FormGroup
            formFieldsData={[
              {
                columnNum: 12,
                label: null,
                fieldName: "promo",
                type: "text",
                regex_check_type: "string",
              },
            ]}
          />

          <Button type="primary" size="medium">
            Update basket
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <table className={cx("cart-table")}>
      <thead>
        <tr>
          {tableHead.map((headerColumn) => (
            <th>{headerColumn}</th>
          ))}
        </tr>
      </thead>
      <tbody>{renderTableBodyRow()}</tbody>
      <tfoot>{renderTableFooterRow()}</tfoot>
    </table>
  );
};

const UpdateBasket = (props) => {
  const [promo, setPromo] = useState("");
  return (
    <div className={cx("update-basket-wrapper")}>
      <div className="grid">
        <div className="row">
          <div className="c-9 gutter">
            <FormGroup
              getUserDataGetterObj={setPromo}
              formFieldsData={[
                {
                  columnNum: 4,
                  fieldName: "postCode",
                  type: "text",
                  regex_check_type: "string",
                  placeholder: "Search for post code",
                  isRequire: false,
                },
              ]}
              actionBtnColumn="2"
              customSubmitBtnStyle={{ height: "40px", marginTop: "-1.4rem" }}
              action="Search"
            />
          </div>
          <div className="c-3 gutter">
            <Button
              type="primary"
              size="medium"
              customStyle={{ height: "40px" }}
            >
              UPDATE BASKET
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
const CartInfo = (props) => {
  return (
    <>
      <CartTable />
      <UpdateBasket />
    </>
  );
};

export default CartInfo;
