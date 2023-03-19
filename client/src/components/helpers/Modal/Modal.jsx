import React from "react";

import Button from "~/components/helpers/Button/Button";

import classNames from "classnames/bind";
import style from "./Modal.module.scss";
const cx = classNames.bind(style);

function Modal({ message, visible, handleCloseModal }) {
  return (
    <div className={cx("container", { visible: visible })}>
      <div className={cx("cookiesContent")} id="cookiesPopup">
        {/* <button className={cx("close")}>✖</button> */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/1047/1047711.png"
          alt="cookies-img"
        />
        <p>{message}</p>
        {/* <button className={cx("accept")}>That's fine!</button> */}
        <Button maxSize type="primary" size="medium" onClick={handleCloseModal}>
          Close
        </Button>
      </div>
    </div>
  );
}

export default Modal;
