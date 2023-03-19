import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import style from "../Table.module.scss";
const cx = classNames.bind(style);

const filterIconWrapperStyle = { marginLeft: ".6rem", opacity: ".6" };

const TableHead = (props) => {
  const { filter, data } = props.tableHead;

  const renderContent = (content) => {
    if (filter) {
      return (
        <>
          {content}
          <span style={filterIconWrapperStyle}>
            <FontAwesomeIcon icon={faArrowUp} />
          </span>
        </>
      );
    } else {
      return <>{content}</>;
    }
  };

  return (
    <thead>
      <tr>
        {data &&
          data.map((content) => {
            return (
              <th className={cx("table-head-column")} key={content}>
                {renderContent(content)}
              </th>
            );
          })}
        <th className={cx("table-head-column")}>Action</th>
      </tr>
    </thead>
  );
};

export default TableHead;

// todo: Handle logic filter from a-z <-> z-a
