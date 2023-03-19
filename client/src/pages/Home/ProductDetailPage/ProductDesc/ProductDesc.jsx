import React, { useState, useRef, useEffect } from "react";

import AddProductButton from "./AddProductButton/AddProductButton";
import payment_cards from "~/assets/img/Products/payment_cards.png";
import PaymentMethod from "~/components/helpers/PaymentMethod/PaymentMethod";

import { useSelector } from "react-redux";

import classNames from "classnames/bind";
import style from "./ProductDesc.module.scss";
const cx = classNames.bind(style);

const ProductOptions = (props) => {
  const { productDetail } = props;
  return (
    productDetail.product_options && (
      <div className={cx("product-options-wrapper")}>
        {productDetail.product_options.map((options) => {
          return (
            <div key={options.name}>
              <h4
                className={cx("product-option-title")}
              >{`Fabric/${options.name}:`}</h4>
              <ul className={cx("product-option-list")}>
                {options.option_list.map((option) => {
                  return (
                    <li className={cx("option-item")} key={option.title}>
                      <img
                        className={cx("option-item-img")}
                        src={option.imgSrc}
                        alt={options.title}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    )
  );
};

const ProductMeta = (props) => {
  const { productDetail } = props;
  return (
    <>
      <div className={`${cx("product-meta-wrapper")}`}>
        <div className={cx("product-meta-row-content")}>
          <span className={cx("label")}>SKU: </span>
          <span className={cx("caption")}>9000047694</span>
        </div>
        <div className={cx("product-meta-row-content")}>
          <span className={cx("label")}>Categories: </span>
          <span className={cx("caption")}>
            {productDetail.product_category}
          </span>
        </div>
        <div className={cx("product-meta-row-content")}>
          <span className={cx("label")}>Brand: </span>
          <span className={cx("caption")}>Stressless</span>
        </div>
      </div>
      <div className="payment-cards-img-wrapper flex-center">
        <img src={payment_cards} alt="payment cards" />
      </div>
    </>
  );
};
const ProductDesc = (props) => {
  const productDetail = useSelector(
    (state) => state.CartReducer.currentProductDetail
  );

  return (
    <div className={cx("product-description-wrapper")}>
      <div className="row">
        {/* Thumbnail */}
        <div className="c-6 gutter">
          <div className={cx("product-detail-img-link")}>
            <img
              className={cx("product-detailt-img")}
              src={productDetail.product_imgSrc}
              alt={productDetail.product_name}
            />
          </div>
        </div>
        {/* Img list */}
        <div className="c-1 gutter">
          <div className={cx("product-img-list-wrapper")}>
            <ul className={cx("product-img-list")}>
              {productDetail.product_thumbnails &&
                productDetail.product_thumbnails.map((thumbnailsData) => {
                  return (
                    <li
                      className={cx("product-img-item")}
                      key={thumbnailsData.image_title}
                    >
                      <a href="#" className={cx("product-img-link-wrapper")}>
                        <img
                          src={thumbnailsData.image_src}
                          alt={thumbnailsData.image_title}
                        />
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        {/* Product information */}
        <div className="c-5 gutter">
          <div className={cx("product-information-wrapper")}>
            <span className={cx("product-name")}>
              {productDetail.product_name}
            </span>
            <span className={cx("product-price-wrapper")}>
              <span className={cx("old-price")}>£3,179.00</span>
              <span
                className={cx("discount-price")}
              >{`£${productDetail.product_price}`}</span>
            </span>
            <ProductOptions productDetail={productDetail} />
            <PaymentMethod
              optionList={[
                {
                  type: "Pay Deposit",
                  benefit: "Pay a 25% deposit per item",
                },
                {
                  type: "Pay Full",
                },
              ]}
            />
            <AddProductButton />
            <ProductMeta productDetail={productDetail} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDesc;

// TODO: Handle fetchData fail case
// TODO: Handle fetchData success case
