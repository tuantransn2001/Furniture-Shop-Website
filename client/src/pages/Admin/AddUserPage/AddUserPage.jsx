import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import style from "./AddUserPage.module.scss";
import Button from "~/components/helpers/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsProgress, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "~/components/SearchBar/SearchBar";
import Table from "~/components/helpers/Table/Table";
import EditUserFormModal from "./EditUserFormModal/EditUserFormModal";
import { useGet, fetchApi } from "~/services/utils/fetch";
const cx = classNames.bind(style);
const roleStyle = {
  fontSize: "1.2rem",
  color: "#0d6efd",
  textTransform: "capitalize",
};
const statusStyle = {
  borderRadius: "1.2rem",
  padding: "0.3rem 1.8rem",
  backgroundColor: "#05d34e",
  color: "#fff",
};

const AddUserPageHeader = (props) => {
  const renderMetricsCardList = () => {
    const data = [
      {
        content: "Total Budgets",
        number: "74,000",
      },
      {
        content: "Monthly Budgets",
        number: "74,000",
      },
      {
        content: "Weekly Budgets",
        number: "74,000",
      },
      {
        content: "Today Budgets",
        number: "74,000",
      },
    ];

    return (
      <div className={`${cx("metrics-card-list")} grid`}>
        <div className="row">
          {data &&
            data.map(({ content, number }) => {
              return (
                <div className="c-3 gutter" key={content}>
                  <div className={cx("metrics-card-item")}>
                    <span className={cx("metrics-card-content-wrapper")}>
                      {content}
                      <FontAwesomeIcon icon={faAngleUp} />
                    </span>
                    <span
                      className={cx("metrics-card-number-wrapper")}
                    >{`$${number}`}</span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* <header className={cx("add-user-page-header")}>
        <div className="add-user-page-content-wrapper">
          <h3 className="page-content-title">User list</h3>
          <span className="result-founded">19 result founded</span>
        </div>
        <div className="add-user-page-config-btn-wrapper">
          <Button size={null} type="config-btn">
            <FontAwesomeIcon icon={faBarsProgress} />
          </Button>
        </div>
      </header> */}
      {renderMetricsCardList()}
    </>
  );
};

const AddUserPage = (props) => {
  const { fetchResultData, isLoading } = useGet("user");
  const [isAceptReloadPage, setIsAceptReloadPage] = useState(false);
  const tableHead = ["name", "email", "status", "role"];
  const tableBody =
    fetchResultData.data &&
    fetchResultData.data.map((userInfo) => {
      return {
        name: `${userInfo.lastName} ${userInfo.firstName}`,
        email: userInfo.email,
        status: "active",
        role: userInfo.type,
      };
    });
  const handleEditUserById = async (id) => {};
  // TODO: Fix
  // const handleDeleteUserById = async (id) => {
  //   const url = `user/${id}`;
  //   const fetchResult = await fetchApi.get(url);
  //   try {
  //     if (fetchResult.status === 201) {
  //       setIsAceptReloadPage(true);
  //     }
  //   } catch (err) {
  //     console.log(`handleDeleteUserById is working wrong!! - Err: ${err}`);
  //   }
  // };
  useEffect(() => {
    isAceptReloadPage && window.location.reload();
  }, [isAceptReloadPage]);
  return (
    <>
      <div className={cx("add-user-page-wrapper")}>
        <AddUserPageHeader />
        <Table
          tableHead={{
            filter: true,
            data: tableHead,
          }}
          tableBody={tableBody}
          paginateOptions={{
            isPaginateOn: true,
            gridColumn: null,
            itemsPerPage: 5,
            itemList: tableBody,
          }}
          actionOptions={[
            {
              type: "edit",
              handler: handleEditUserById,
            },
            // TODO: Fix
            // {
            //   type: "delete",
            //   handler: handleDeleteUserById,
            // },
          ]}
        />
      </div>
      <EditUserFormModal />
    </>
  );
};

export default AddUserPage;

// todo: Handle filter with table header icon
