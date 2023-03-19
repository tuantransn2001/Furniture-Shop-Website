import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faInfo,
  faExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import Button from "~/components/helpers/Button/Button";

import classNames from "classnames/bind";
import style from "./ToastMessage.module.scss";

const cx = classNames.bind(style);

const stuff = {
  color: {
    success: "#05d34e",
    warn: "#ffcc00",
    info: "#3865a3",
  },
  icon: {
    success: faCheck,
    warn: faExclamation,
    info: faInfo,
  },
};

const IconType = ({ type }) => {
  return (
    <div
      style={{
        backgroundColor: stuff.color[type],
      }}
      className={`${cx("icon-type-wrapper")} flex-center`}
    >
      <FontAwesomeIcon icon={stuff.icon[type]} />
    </div>
  );
};

const CloseToastButton = ({ handleCloseToast }) => {
  return (
    <div className={cx("close-toast-btn-wrapper")}>
      <Button
        size="medium"
        type="primary"
        ghost
        onClick={() => {
          handleCloseToast(false);
        }}
      >
        <FontAwesomeIcon color="gray" icon={faXmark} />
      </Button>
    </div>
  );
};

const ProcessBar = ({ type, handleCloseToast }) => {
  const [processPercent, setProcessPercent] = useState(0);

  if (processPercent >= 100) {
    handleCloseToast();
  }

  useEffect(() => {
    const handleIncreaseBaseOnTime = () => {
      const interval = setInterval(() => {
        setProcessPercent((prev) => (prev === 100 ? 0 : prev + 2.5));
        if (processPercent >= 100) {
          clearInterval(interval);
        }
      }, 1000);
    };

    handleIncreaseBaseOnTime();

    return () => {
      handleIncreaseBaseOnTime();
    };
  }, []);

  return (
    <div className={cx("process-bar-wrapper")}>
      <div
        style={{
          width: `${processPercent}%`,
          backgroundColor: stuff.color[type],
        }}
        className={cx("process-bar")}
      />
    </div>
  );
};

const ToastMessage = (props) => {
  const { title, message, type, visible, handleCloseToast } = props;

  useEffect(() => {
    return () => {
      handleCloseToast();
    };
  });

  return (
    <div className={cx("toast-message-wrapper", { visible: visible })}>
      <IconType type={type} />

      <div className={cx("toast-message-content")}>
        <h4>{title}</h4>
        <p className="paragraph-text-style">{message}</p>
      </div>

      <CloseToastButton handleCloseToast={handleCloseToast} />
      <ProcessBar type={type} handleCloseToast={handleCloseToast} />
    </div>
  );
};

export default ToastMessage;
