import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import style from "./Page.module.scss";

const cx = classNames.bind(style);

const Page = ({ title, subTitle, children }) => {
  const renderPageHeader = () => {
    return (
      title && (
        <header className={cx("page-header")}>
          <h2 className={cx("page-title")}>{title}</h2>
          {subTitle && <h3 className={cx("page-subTitle")}>{subTitle}</h3>}
        </header>
      )
    );
  };
  return (
    <div className={cx("page-container")}>
      {renderPageHeader()}

      <div className={`${cx("page-body")} grid wide`}>
        <div className="row">
          <div className="c-12 gutter">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Page;

Page.propsType = {
  subTitle: PropTypes.element,
};
