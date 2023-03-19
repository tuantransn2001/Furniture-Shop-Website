import React from "react";
// ? Local
import CartBtn from "./CartBtn/CartBtn";
import Button from "~/components/helpers/Button/Button";
import AuthButton from "./AuthButton/AuthButton";
// ? Assets
import { viewStoreIcon, searchIcon } from "~/components/Img/Img";
import lenleys_main_logo from "~/assets/img/logo/lenleys_main_logo.png";

import style from "./Header.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

const storeLocationBtnContentStyle = {
  display: "flex",
  alignItems: "center",
  gap: ".8rem",
  fontSize: "1.4rem",
  fontWeight: "600",
  color: "#272525",
};

const headingTitleStyle = {
  fontSize: "1.2rem",
  fontWeight: "600",
  color: "#ffffff",
};

const Header = (props) => {
  return (
    <header id={cx("header")} className={cx("bg-wrapper")}>
      <div className={`${cx("widget-elementor-bg")} flex-center`}>
        <Button ghost type={null} size={null} linkDirection="/home/contact">
          <span style={headingTitleStyle}>
            ACCESSORIES AVAILABLE FOR NATIONWIDE DELIVERY
          </span>
        </Button>
      </div>
      <div className="grid wide">
        <div className={cx("header")}>
          <div className="row mb-2">
            <div className="c-3 gutter flex-item-horizontal-start gap-1">
              <AuthButton />

              <Button
                ghost
                type="widget-elementor-with-text"
                size={null}
                linkDirection="/home/contact"
              >
                <span style={storeLocationBtnContentStyle}>
                  {viewStoreIcon()} OUR STORES
                </span>
              </Button>
            </div>
            <div className="c-6 gutter flex-center">
              <Button linkDirection="/" type={null} size={null}>
                <img
                  src={lenleys_main_logo}
                  alt="Main Logo"
                  className={cx("logo-img")}
                />
              </Button>
            </div>
            <div className="c-3 gutter flex-item-horizontal-end gap-1">
              <Button
                ghost
                type="widget-elementor"
                size={null}
                linkDirection="/home/search"
              >
                {searchIcon()}
              </Button>
              <CartBtn />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
