import React, { useEffect, useState, useCallback } from "react";
import Page from "~/components/helpers/Page/Page";
import FormGroup from "~/components/helpers/FormGroup/FormGroup";
import CheckoutOrderReview from "~/components/CheckoutOrderReview/CheckoutOrderReview";

import { useSelector } from "react-redux";
import axios from "axios";
import { requireInfoData } from "./data";
import { useTitle } from "~/customizes/hooks";
import { validateObjectWithKeyList } from "~/common/common";
import { fetchApi } from "~/services/utils/fetch";
import Modal from "../../../components/helpers/Modal/Modal";

const CheckoutPage = (props) => {
  const cartList = useSelector((state) => state.CartReducer.cartList);
  console.log(cartList);
  const [promo, getPromo] = useState({});
  const [userPayment, getUserPayment] = useState({});
  const [userOrderInformation, getUserOrderInformation] = useState({});
  const [modalContent, setModalContent] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleOnClick = useCallback(() => {
    const isFetch = validateObjectWithKeyList(
      [
        "firstName",
        "lastName",
        "phoneNumber",
        "email",
        "address",
        "note",
        "discount_price",
        "userPayment",
      ],
      userOrderInformation
    );

    if (isFetch) {
      axios
        .post("/order-detail/create-order", userOrderInformation)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  }, [promo, userOrderInformation, userPayment]);

  useEffect(() => {
    const validatePromo = validateObjectWithKeyList(["postCode"], promo);
    if (validatePromo) {
      try {
        fetchApi
          .get(`/order-detail/check_promo/${promo.postCode}`)
          .then((response) => {
            getUserOrderInformation((prev) => {
              return {
                ...prev,
                discount_price: response.data.discount_price,
              };
            });
            setModalContent(
              `You have been got ${response.data.discount_price} discount`
            );
            setModalVisible(true);
          });
      } catch (err) {
        setModalContent(`Your promo is In-valid`);
        setModalVisible(true);
      }
    }
  }, [promo]);

  useEffect(() => {
    const validateUserPayment = validateObjectWithKeyList(
      ["type"],
      userPayment
    );
    validateUserPayment &&
      getUserOrderInformation((prev) => {
        return {
          ...prev,
          userPayment: userPayment.type,
        };
      });
  }, [userPayment]);

  useTitle("Checkout - Lenleys");
  return (
    <Page
      title="Checkout"
      subTitle={
        <span
          style={{
            fontSize: "13px",
          }}
        >
          Have a promo ?
          <a
            href="#"
            style={{
              color: "#272525",
              textDecoration: "underline",
            }}
          >
            Click here to search it
          </a>
        </span>
      }
    >
      <Modal
        message={modalContent}
        visible={modalVisible}
        handleCloseModal={() => {
          setModalVisible(false);
        }}
      />
      <div className="grid wide" style={{ width: "1000px" }}>
        <div className="row">
          <div className="c-7 gutter">
            <>
              <FormGroup
                getUserDataGetterObj={getPromo}
                formFieldsData={[
                  {
                    columnNum: 5,
                    label: "PostCode Search",
                    fieldName: "postCode",
                    type: "text",
                    regex_check_type: "string",
                    placeholder: "Search for post code",
                    description: "Enter Address Manually (Uppercase)",
                    isRequire: false,
                  },
                ]}
                actionBtnColumn="3"
                customSubmitBtnStyle={{ height: "40px", marginTop: "6px" }}
                formCustomStyle={{
                  marginBottom: "30px",
                  paddingBottom: "30px",
                  borderBottom: "1px solid #272525",
                }}
                action="Search"
              />
              <FormGroup
                formFieldsData={requireInfoData}
                getUserDataGetterObj={getUserOrderInformation}
                action="Confirm"
              />
            </>
          </div>
          <div className="c-1 gutter"></div>
          <div className="c-4 gutter">
            <CheckoutOrderReview
              actionHandler={handleOnClick}
              getUserPayment={getUserPayment}
            />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default CheckoutPage;
