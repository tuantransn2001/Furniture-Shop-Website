import React, { useContext } from "react";
import InputContext from "../InputFieldContext";
import classNames from "classnames/bind";
import style from "./LabelTag.module.scss";
const cx = classNames.bind(style);
const LabelTag = (props) => {
  const { label, isRequire } = useContext(InputContext);

  const renderLabelTag = () => {
    if (isRequire) {
      return (
        <>
          {label} <span className={cx("is-require-symbol")}>*</span>
        </>
      );
    }

    return <span>{label}</span>;
  };

  return (
    <label htmlFor="form-input" className={cx("form-label")}>
      {renderLabelTag()}
    </label>
  );
};
export default LabelTag;
