import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "~/redux/configStore";
import GlobalStyle from "~/components/helpers/GlobalStyle/GlobalStyle";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <GlobalStyle>
      <App />
    </GlobalStyle>
  </Provider>
);
