import React, { useState, forwardRef } from "react";
import classNames from "classnames/bind";
import style from "./DropDown.module.scss";
const cx = classNames.bind(style);

const DropDown = (props, ref) => {
  const { label, options } = props;
  const [userChoose, getUserChoose] = useState();

  const renderLabel = () => {
    return (
      label && (
        <label className={cx("drop-down-label")} htmlFor={cx("select")}>
          {label}
        </label>
      )
    );
  };
  const renderOptions = () => {
    return options.map((option, index) => {
      return (
        <option value={option.value} key={index} id={cx("option")}>
          {option.content}
        </option>
      );
    });
  };

  return (
    <div className={cx("drop-down-wrapper")}>
      {renderLabel()}
      <select name={cx("drop-down")} id={cx("select")} ref={ref}>
        {renderOptions()}
      </select>
    </div>
  );
};

export default forwardRef(DropDown);
