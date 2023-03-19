import React, { useState, useEffect } from "react";
import ProductDesc from "./ProductDesc/ProductDesc";
import { useParams } from "react-router-dom";
import { useTitle } from "~/customizes/hooks";
import Page from "~/components/helpers/Page/Page";
import Tab from "./Tab/Tab";
import { fetchApi } from "~/services/utils/fetch";

import { useDispatch } from "react-redux";
import { SET_DEFAULT_CART_ITEM } from "~/redux/constants/CartConstants/CartConstants";

import classNames from "classnames/bind";
import style from "./ProductDetailPage.module.scss";
const cx = classNames.bind(style);

const ProductDetailPage = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("Lenleys - Product detail - loading...");

  useTitle(title);

  // ? Fetch data
  useEffect(() => {
    const handleFetchProductDetailData = async () => {
      const fetchRequestResult = await fetchApi.get(
        `product/by_id/${params["id"]}`
      );
      try {
        const { data, status } = fetchRequestResult;

        if (status === 200) {
          dispatch({
            type: SET_DEFAULT_CART_ITEM,
            payload: {
              product: data,
            },
          });
          setTitle(data.product_name);
        } else {
          console.log("handleFetchProductDetail is working wrong!");
        }
      } catch (err) {
        console.error(err);
      }
    };
    handleFetchProductDetailData();
  }, []);

  const ProductInformation = (props) => {
    const tabData = ["Description", "Additional information", "Delivery"];
    const [currentTab, setCurrentTab] = useState(tabData[0]);

    const Content = ({ currentTab }) => {
      switch (currentTab) {
        case tabData[0]: {
          return (
            <div className={cx("description-tab-content-wrapper")}>
              <p className="paragraph-text-style mb-2">
                Quickship models available in 6-8 weeks. Selected Fabric/Wood
                combinations only.
              </p>
              <p className="paragraph-text-style mb-3">
                With its contemporary design and individually reclining wide
                seats, the Buckingham upholstery collection brings both ultimate
                <br /> comfort and style to any room while refusing to give up
                any of its amazing build quality or high-quality materials. This
                2 Seater <br /> Sofa is available in 3 different colour
                combinations that are available quicker than usual.
              </p>

              <ul className="mb-3">
                <li>
                  <span className="paragraph-text-style">
                    Available in 3 different Leather/Wood combinations.
                  </span>
                </li>
                <li>
                  <span className="paragraph-text-style">
                    10 Year internal mechanism guarantee.
                  </span>
                </li>
                <li>
                  <span className="paragraph-text-style">
                    If you would like to order this in a different colour
                    combination, please click here or visit us in-store.
                  </span>
                </li>
              </ul>

              <h4 className="h4-size-default">
                VIEW THE STRESSLESS RANGE AND SEE THE SUITE IN YOUR HOME WITH
                THE <br /> STRESSLESS @HOME APP, AVAILABLE FOR APPLE AND ANDROID
                DEVICES BELOW.
              </h4>
            </div>
          );
        }
        case tabData[1]: {
          return (
            <div className={cx("additional-information-wrapper")}>
              <div className="grid">
                <div className="row">
                  <div className="c-6 gutter paragraph-text-style">
                    Dimensions
                  </div>
                  <div className="c-6 gutter paragraph-text-style">
                    W: cm x H: cm x L: cm
                  </div>
                </div>
              </div>
            </div>
          );
        }
        case tabData[2]: {
          return (
            <div className={cx("delivery-wrapper")}>
              <p className="paragraph-text-style mb-2">
                <span className="paragraph-text-style-strong">
                  Accessories:
                </span>
                £5 for mainland UK delivery. Delivery times can vary depending
                on suppliers and stock locations, but we will always <br /> aim
                to deliver accessory orders within 7-10 working days where
                delivery is available.
              </p>
              <p className="paragraph-text-style mb-3">
                <span className="paragraph-text-style-strong">Furniture:</span>
                Within Kent and East Sussex we charge a competitive flat rate of
                £59 as a contribution towards delivery and <br />
                installation per order. We can also deliver to West Sussex and
                Surrey and the delivery contribution is £100.
              </p>

              <p className="paragraph-text-style">
                Please see our{" "}
                <a style={{ textDecoration: "underline" }} href="#">
                  Delivery Services
                </a>{" "}
                page for more information.
              </p>
            </div>
          );
        }
        default: {
          return "";
        }
      }
    };

    return (
      <div className={cx("product-information-extend-wrapper")}>
        <Tab tabContentList={tabData} setCurrentTab={setCurrentTab} />
        <Content currentTab={currentTab} />
      </div>
    );
  };

  return (
    <Page>
      <div className={`${cx("product-detail-wrapper")} grid`}>
        {/* Product information */}
        <ProductDesc />
        {/* Product more information */}
        <ProductInformation />
        {/* You may also like product */}
      </div>
    </Page>
  );
};

export default ProductDetailPage;

// TODO: Fix payment options with radio input
