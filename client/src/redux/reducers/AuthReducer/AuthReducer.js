import {
  SET_AUTH_STATUS,
  STORE_CURRENT_USER_TOKEN,
  STORE_CURRENT_USER_DETAIL,
} from "../../constants/AuthConstants/AuthConstants";

const initialState = {
  user_detail: {},
  user_token: "",
  refresh_token: "",
  authStatus: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_CURRENT_USER_TOKEN: {
      state.user_token = action.payload.token;

      localStorage.setItem("access_token", state.user_token);
      return { ...state };
    }
    case STORE_CURRENT_USER_DETAIL: {
      state.user_detail = {
        id: action.payload.data.id,
        email: action.payload.data.email,
      };
      localStorage.setItem("user_detail", state.user_detail);
      state.user_detail = { ...state.user_detail };
      return { ...state };
    }
    case SET_AUTH_STATUS: {
      const authStatusExtension = ["login", "register", "logout"];
      const isValidStatus = authStatusExtension.includes(action.payload.status);

      if (isValidStatus) {
        state.authStatus = action.payload.status;
      }

      return { ...state };
    }
    default: {
      return { ...state };
    }
  }
};

export default AuthReducer;
