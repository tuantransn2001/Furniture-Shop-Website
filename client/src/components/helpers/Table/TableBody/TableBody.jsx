import React from "react";
import ConfigBtn from "../ConfigBtn/ConfigBtn";

import classNames from "classnames/bind";
import style from "../Table.module.scss";

const cx = classNames.bind(style);

const renderSpecialRowStyle = (index) => {
  if (index % 2 === 0) {
    return {
      backgroundColor: "#F8F8F8",
    };
  }
};

const renderSpecialColumnStyle = (key) => {
  switch (key) {
    case "role": {
      return {
        textTransform: "capitalize",
      };
    }
    case "status": {
      const colorList = [
        "linear-gradient(180deg, #6989FE 0%, #3C64F4 100%)",
        "#FCA549",
        "#757D8A",
      ];

      const randomIndex = Math.floor(Math.random() * colorList.length);

      return {
        textTransform: "capitalize",
        color: colorList[randomIndex],
      };
    }
    default: {
      return {};
    }
  }
};

const TableBody = (props) => {
  return (
    <tbody>
      {props.itemsPerPageData &&
        props.itemsPerPageData.map((rowDataObj, index) => {
          return (
            <tr key={rowDataObj.id} style={renderSpecialRowStyle(index)}>
              {Object.entries(rowDataObj).map(([key, value]) => {
                return (
                  <td
                    className={cx("table-body-column")}
                    key={key}
                    style={renderSpecialColumnStyle(key)}
                  >
                    {value}
                  </td>
                );
              })}
              <td className={cx("table-body-column")}>
                {props.actionOptions &&
                  props.actionOptions.map(({ type, handler }) => {
                    return (
                      <ConfigBtn type={type} key={type} handler={handler} />
                    );
                  })}
              </td>
            </tr>
          );
        })}
    </tbody>
  );
};

export default TableBody;
