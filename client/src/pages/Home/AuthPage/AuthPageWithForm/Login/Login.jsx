import React, { useEffect, useState } from "react";
import LoadingPage from "~/pages/LoadingPage/LoadingPage";
import FormGroup from "~/components/helpers/FormGroup/FormGroup";
import ToastMessage from "~/components/helpers/ToastMessage/ToastMessage";
import SwitchFormBtn from "../SwitchFormBtn/SwitchFormBtn";
import { useLogin } from "~/services/api";
import { useDispatch } from "react-redux";
import {
  STORE_CURRENT_USER_DETAIL,
  STORE_CURRENT_USER_TOKEN,
  SET_AUTH_STATUS,
} from "~/redux/constants/AuthConstants/AuthConstants";

import { validateObjectWithKeyList, isEmpty } from "~/common/common";

import classNames from "classnames/bind";
import style from "./Login.module.scss";
import { fetchApi } from "../../../../../services/utils/fetch";
const cx = classNames.bind(style);

const loginFieldsData = [
  {
    columnNum: 12,
    label: "Email address",
    fieldName: "email",
    type: "text",
    regex_check_type: "email",
  },
  {
    columnNum: 12,
    label: "Password",
    fieldName: "password",
    type: "password",
    regex_check_type: "password",
  },
];

const Login = ({ setFormSwitcher }) => {
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState({});
  const [loginButtonStatus, setLoginButtonStatus] = useState("");

  // ? Check userInput is empty or not
  const validateUserInput = validateObjectWithKeyList(
    loginFieldsData.map((el) => el.fieldName),
    userInput
  );

  useEffect(() => {
    validateUserInput &&
      fetchApi.post("auth/login", userInput).then((response) => {
        console.log(response);
        const { id, email, token } = response.data.data;
        dispatch({
          type: STORE_CURRENT_USER_DETAIL,
          payload: {
            data: { id, email },
          },
        });
        // ? Store token to local storage
        dispatch({
          type: STORE_CURRENT_USER_TOKEN,
          payload: {
            token,
          },
        });

        // ? Set AuthStatus
        dispatch({
          type: SET_AUTH_STATUS,
          payload: {
            status: "login",
          },
        });
      });
  }, [userInput, validateUserInput]);

  return (
    <>
      <FormGroup
        formFieldsData={loginFieldsData}
        getUserDataGetterObj={setUserInput}
        actionButtonStatus={loginButtonStatus}
        action="Log in"
      />
      <div className={cx("remember-password-block-wrapper")}>
        <input
          type="checkbox"
          id="remmember-password-checkbox"
          className={cx("remmember-password-checkbox")}
        />
        <label
          htmlFor="remmember-password-checkbox"
          className={cx("remmember-password-label")}
        >
          Remember password
        </label>
      </div>

      <div className={cx("sign-up-btn-content-wrapper")}>
        Don't have an account ?
        <SwitchFormBtn to="register" setFormSwitcher={setFormSwitcher} />
      </div>
    </>
  );
};
export default Login;
