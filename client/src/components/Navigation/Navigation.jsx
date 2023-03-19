import React from "react";
import classNames from "classnames/bind";

import LoadingPage from "~/pages/LoadingPage/LoadingPage";

import { useNavigate } from "react-router-dom";
import { useGet } from "~/services/utils/fetch";
import style from "./Navigation.module.scss";

const cx = classNames.bind(style);

const Navigation = (props) => {
  const navigate = useNavigate();
  const { fetchResultData, isLoading } = useGet("category");

  const handleGetCurrentCategoryByID = (event, category) => {
    navigate(`home/c/${category.name}/${category.id}`);
  };

  const renderNavContent = () => {
    return (
      fetchResultData.data &&
      fetchResultData.data.map((nav, index) => {
        return (
          <li
            className={cx("nav-item")}
            key={nav.id}
            onClick={(e) => {
              handleGetCurrentCategoryByID(e, nav);
            }}
          >
            <span className={cx("nav-content")}>{nav.name}</span>
          </li>
        );
      })
    );
  };

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className={cx("nav-bg")}>
          <div className="grid wide">
            <div className="row">
              <div className="c-12 gutter">
                <nav className={`${cx("main-navigation")} flex-center`}>
                  <ul className={cx("nav-list")}>{renderNavContent()}</ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Navigation;
