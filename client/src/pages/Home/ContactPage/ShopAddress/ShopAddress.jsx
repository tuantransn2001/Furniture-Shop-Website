import React from "react";
import classNames from "classnames/bind";
import style from "./ShopAddress.module.scss";
const cx = classNames.bind(style);
const shopAddressBoxData = [
  {
    city: "Canterbury",
    address: ["25-34 ROPER ROAD", "CANTERBURY", "KENT", "CT2 7EL"],
    phoneNumber: "01227 766 655",
    email: "info@lenleys.co.uk",
  },
  {
    city: "MAIDSTONE",
    address: ["33 SANDLING ROAD", "MAIDSTONE", "KENT", "ME14 2RF"],
    phoneNumber: "01622 753 073",
    email: "maidstone@lenleys.co.uk",
  },
];
const ShopAddress = (props) => {
  const renderAddressBreakLine = (addressArr) => {
    return (
      <div className={cx("shop-address")}>
        {addressArr.map((addressStr, index) => {
          return (
            <div key={index}>
              <span>{addressStr}</span>
              <br></br>
            </div>
          );
        })}
      </div>
    );
  };

  return shopAddressBoxData.map((shopAddressData, index) => {
    return (
      <div className="c-6 gutter" key={index}>
        <div className={cx("shop-address-wrapper")}>
          <h2 className={cx("shop-address-city")}>{shopAddressData.city}</h2>
          {renderAddressBreakLine(shopAddressData.address)}
          <div className={cx("shop-contact-wrapper")}>
            <h3 className={cx("shop-contact-title")}>Phone</h3>
            <span className={cx("shop-contact-desc")}>
              {shopAddressData.phoneNumber}
            </span>
          </div>
          <div className={cx("shop-contact-wrapper")}>
            <h3 className={cx("shop-contact-title")}>Email</h3>
            <span className={cx("shop-contact-desc")}>
              {shopAddressData.email}
            </span>
          </div>
          <a href="#" className={cx("find-on-map-btn-link")}>
            Find on a map
          </a>
        </div>
      </div>
    );
  });
};

export default ShopAddress;
