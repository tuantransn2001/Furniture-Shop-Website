import React, { useState, useEffect } from "react";
import default_avt from "~/assets/img/Header/default_avt.png";
import Button from "~/components/helpers/Button/Button";
import { authIcon } from "~/components/Img/Img";
import { fetchApi } from "~/services/utils/fetch";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import style from "./AuthButton.module.scss";
const cx = classNames.bind(style);

const UserDetail = ({ userDetail }) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <div className={cx("user-detail-wrapper")}>
      <div
        className={cx("user-detail")}
        onMouseOver={() => {
          setIsShow(true);
        }}
        onMouseOut={() => {
          setIsShow(false);
        }}
      >
        <img
          src={userDetail.avatar || default_avt}
          alt={userDetail.firstName + " " + userDetail.lastName}
        />
        {/* <FontAwesomeIcon icon={faAngleDown} /> */}
      </div>

      <div
        className={cx("user-information-notification-dropdown", {
          isShow: isShow,
        })}
        onMouseOver={() => {
          setIsShow(true);
        }}
        onMouseOut={() => {
          setIsShow(false);
        }}
      >
        <header id={cx("header")}>
          <div className={cx("user-detail-expand-wrapper")}>
            <img src={userDetail.avatar || default_avt} alt="" />
            <div className={cx("user-detail-expand")}>
              <span>{`${userDetail.lastName} ${userDetail.firstName}`}</span>
              <span>{userDetail.email}</span>
            </div>
          </div>
        </header>
        <div className={cx("user-dropdown-navigation-list-wrapper")}>
          <ul className={cx("user-dropdown-navigation-list")}>
            <li>Profile</li>
            <li>Notification</li>
            <li>Edit profile</li>
            <li>View basket</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const AuthButton = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userDetail, setUserDetail] = useState({});

  return isAuth ? (
    <UserDetail userDetail={userDetail} />
  ) : (
    <Button
      ghost
      type="widget-elementor"
      size={null}
      linkDirection="/home/authenticate"
    >
      {authIcon()}
    </Button>
  );
};

export default AuthButton;
