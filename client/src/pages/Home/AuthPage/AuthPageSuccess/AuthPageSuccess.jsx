import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { SET_AUTH_STATUS } from "~/redux/constants/AuthConstants/AuthConstants";
import { useNavigate } from "react-router-dom";

import Tooltip from "~/components/helpers/Tooltip/Tooltip";
import Button from "~/components/helpers/Button/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import style from "./AuthPageSuccess.module.scss";
const cx = classNames.bind(style);

const authSuccessStatusContent = {
  register: {
    title: "Congratulate! Now you are a member of lenleys family.",
    content: "The Lenleys team will be in touch soon.",
  },
  login: {
    title: "Hi! Welcome back.",
    content: "Hope you have happy time shopping in leyleys.",
  },
};

const DirectionButtons = ({ authStatus }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigateTo = (directionPath) => {
    navigate(directionPath);
  };

  if (authStatus === "login") {
    return (
      <div className="grid">
        <div className="row">
          <div className="c-6 gutter">
            <Tooltip
              placement="top"
              promptText="Feature is on develop state"
              maxSize
            >
              <Button size="small" type="primary" maxSize>
                Continue shopping
              </Button>
            </Tooltip>
          </div>
          <div className="c-6 gutter">
            <Button
              size="small"
              type="primary"
              maxSize
              onClick={(e) => {
                handleNavigateTo("/");
              }}
            >
              Back to home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (authStatus === "register") {
    return (
      <>
        <Button
          size="small"
          type="primary"
          maxSize
          onClick={() => {
            dispatch({
              type: SET_AUTH_STATUS,
              payload: {
                status: "",
              },
            });
          }}
        >
          Log in
        </Button>
        <Button
          size="small"
          type="primary"
          maxSize
          onClick={(e) => {
            handleNavigateTo("/");
          }}
        >
          Back to home
        </Button>
      </>
    );
  }
};

const AuthFormContent = ({ authStatus }) => {
  return (
    <>
      <h1 className={cx("auth-page-success-title")}>
        {authSuccessStatusContent[authStatus].title}
      </h1>
      <span className={cx("auth-page-success-subtitle")}>
        {authSuccessStatusContent[authStatus].content}
      </span>
    </>
  );
};

const AuthPageSuccess = (props) => {
  const { title, content } = props;
  const authStatus = useSelector((state) => state.AuthReducer.authStatus);

  const AuthPageContent = () => {
    return (
      <div className={cx("auth-page-success")}>
        <div className={`${cx("auth-page-icon-wrapper")} flex-center`}>
          <FontAwesomeIcon icon={faCheck} />
        </div>
        <AuthFormContent
          authStatus={authStatus}
          title={title}
          content={content}
        />
        <div className={cx("direction-btns")}>
          <DirectionButtons authStatus={authStatus} />
        </div>
      </div>
    );
  };

  return (
    <div className={cx("auth-page-success-wrapper")}>
      <AuthPageContent />
    </div>
  );
};

export default AuthPageSuccess;

// TODO: When user register success -> option 1: navigate to login form
// TODO:                            -> option 2: navigate to shopping view
