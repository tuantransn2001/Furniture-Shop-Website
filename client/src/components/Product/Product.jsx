import React, { useRef } from "react";
import Button from "~/components/helpers/Button/Button";
import Tooltip from "~/components/helpers/Tooltip/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import style from "./Product.module.scss";
const cx = classNames.bind(style);

const Product = (props) => {
  const deleteProductBtnRef = useRef(null);
  const productWrapperClassName = cx("product-info-wrapper", {
    isLoading: props.isLoading,
  });

  return (
    <div className={productWrapperClassName}>
      {/* Top content */}
      <div className={cx("product-info-top-content")}>
        <div className={cx("product-top-content-info")}>
          <a href="#" className={cx("product-name-link")}>
            {props.product_name}
          </a>
          <span className={cx("product-category")}>
            {props.product_category}
          </span>
        </div>
        <span className={cx("product-badge")}>Sell</span>
      </div>
      {/* Img */}

      <a href="#" className={cx("product-img-link")}>
        <img
          src={props.product_imgSrc}
          alt={props.product_name}
          className={cx("product-img")}
        />
      </a>
      {/* Rare */}
      <span className={cx("product-rare")}>
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
      </span>
      {/* Bottom content */}
      <div className={cx("product-bottom-content-info")}>
        <span className={cx("product-price")}>
          <span className={cx("product-price-caption")}>price</span>
          <span
            className={cx("product-price-label")}
          >{`$${props.product_price}`}</span>
        </span>
        <span>Options</span>
      </div>
      {/* Controller */}
      <div className={`${cx("product-admin-config-btns")} grid`}>
        <div className="row">
          <div className="c-6 gutter">
            <Button size="small" type="primary" maxSize>
              Edit
            </Button>
          </div>
          <div className="c-6 gutter">
            <Button
              size="small"
              type="primary"
              maxSize
              ref={deleteProductBtnRef}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

// TODO: ADD delete and update product button
