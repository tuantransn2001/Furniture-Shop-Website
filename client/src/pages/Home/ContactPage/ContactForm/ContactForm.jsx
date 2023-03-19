import React, { useState, useEffect } from "react";
import FormGroup from "~/components/helpers/FormGroup/FormGroup";
import { fetchApi } from "~/services/utils/fetch";
import { validateObjectWithKeyList } from "~/common/common";
import classNames from "classnames/bind";
import style from "./ContactForm.module.scss";
import ToastMessage from "../../../../components/helpers/ToastMessage/ToastMessage";

const cx = classNames.bind(style);
const contactFieldsData = [
  {
    columnNum: 6,
    label: "For attention of",
    placeholder: "Centerbury Store",
    fieldName: "attention",
    type: "text",
    regex_check_type: "string",
  },
  {
    columnNum: 6,
    label: "Name",
    placeholder: "Name",
    fieldName: "name",
    type: "text",
    regex_check_type: "string",
  },
  {
    columnNum: 6,
    label: "Email",
    placeholder: "Email address",
    fieldName: "email",
    type: "text",
    regex_check_type: "email",
  },
  {
    columnNum: 6,
    label: "Phone No.",
    placeholder: "Phone number",
    fieldName: "phoneNumber",
    type: "text",
    regex_check_type: "number",
  },
  {
    columnNum: 12,
    label: "Message",
    placeholder: "Enter your message",
    fieldName: "message",
    type: "text",
    regex_check_type: "string",
  },
];

const ContactForm = (props) => {
  const [userFeedBack, getUserFeedback] = useState({});
  const [visibleToast, setVisibleToast] = useState(false);
  const handleCloseToast = () => {
    setVisibleToast(false);
  };

  useEffect(() => {
    const isConfirmSubmit = validateObjectWithKeyList(
      ["attention", "name", "email", "phoneNumber", "message"],
      userFeedBack
    );
    if (isConfirmSubmit) {
      fetchApi.post("/feedback", userFeedBack).then((response) => {
        if (response.status === 201) {
          setVisibleToast(true);
        }
      });
    }
  }, [userFeedBack]);

  return (
    <>
      <div className="c-6 gutter x-center">
        <div className={cx("contact-shop-information grid")}>
          <div className="row">
            <div className="c-12 gutter">
              <div className={`${cx("contact-shop-form-wrapper")} grid`}>
                <div className="row">
                  <div className="c-12 gutter">
                    <h1 className={cx("contact-shop-form-title")}>Enquiries</h1>
                  </div>
                </div>
                <div className="row">
                  <FormGroup
                    formFieldsData={contactFieldsData}
                    getUserDataGetterObj={getUserFeedback}
                    action="Send"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {visibleToast && (
        <ToastMessage
          title="We have been get your feedback!"
          message="Thanks for contact us! Lenleys - team will touch you soon!"
          type="success"
          visible
          handleCloseToast={handleCloseToast}
        />
      )}
    </>
  );
};

export default ContactForm;
