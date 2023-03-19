import React, { useState } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import MyBreadcrumbs from "~/components/helpers/MyBreadcrumbs/MyBreadcrumbs";
import AddProductPage from "~/pages/Admin/AddProductPage/AddProductPage";
import classNames from "classnames/bind";
import style from "./MainDashboard.module.scss";
import Header from "./Header/Header";
import { useEffect } from "react";
const cx = classNames.bind(style);

const DashboardTitle = ({ title }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setCurrentTime(moment().format());
  }, [currentTime]);
  return (
    <div className={cx("main-dashboard-title")}>
      {/* Content */}
      <div className={cx("main-dashboard-title-content-wrapper")}>
        <h2 className={cx("main-dashboard-title")}>{title}</h2>
        <MyBreadcrumbs />
      </div>
      {/* Calendar */}
      <div className={cx("main-dashboard-calendar")}>
        <FontAwesomeIcon icon={faCalendarDays} />
        {currentTime}
      </div>
    </div>
  );
};

const MainDashboard = (props) => {
  return (
    <div className={cx("main-dashboard-wrapper")}>
      <Header />
      <div className={cx("main-dashboard-body-wrapper")}>
        <DashboardTitle title={"Employees"} />
        <div className={cx("main-dashboard-content-wrapper")}>
          <AddProductPage />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
