import React, { useRef, useState, useEffect } from "react";
import Button from "~/components/helpers/Button/Button";
import InputField from "~/components/helpers/FormGroup/InputField/InputField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import style from "./SingleFileUploadModal.module.scss";
import { validateObjectWithKeyList } from "../../common/common";
const cx = classNames.bind(style);

const inputFieldsData = [
  {
    label: "File name",
    type: "text",
    placeholder: "Type here",
    regex_check_type: "string",
    fieldName: "fileName",
  },
  {
    label: "Description",
    type: "text",
    placeholder: "Type here",
    regex_check_type: "string",
    fieldName: "description",
  },
];

const SingleImageUploadModal = ({ getImageInfo }) => {
  const submitBtnRef = useRef(null);
  const filePickerTagRef = useRef(null);
  const uploadContentRef = useRef(null);
  const inputTagArrRef = useRef([]);
  const [file, setFile] = useState(null);
  const [fileInfo, getFileInfo] = useState({});
  const [isSubmitSuccess, setIsSubmitSuccess] = useState("fail");
  const renderInputFields = () => {
    return inputFieldsData.map((fieldData, index) => {
      return (
        <InputField
          {...fieldData}
          key={index}
          ref={(el) => {
            inputTagArrRef.current.push({
              element: el,
              data: fieldData,
            });
          }}
        />
      );
    });
  };
  // * ========== Get File Information ==========
  useEffect(() => {
    const inputTagArrEl = inputTagArrRef.current;
    inputTagArrEl.map((inputTagObj) => {
      const { element, data } = inputTagObj;
      element &&
        element.addEventListener("change", (event) => {
          getFileInfo((prevState) => {
            return {
              ...prevState,
              [data.fieldName]: event.target.value,
            };
          });
        });
    });

    return () => {
      inputTagArrEl.map((inputTagObj) => {
        const { element, data } = inputTagObj;
        element &&
          element.removeEventListener("change", (event) => {
            getFileInfo((prevState) => {
              return {
                ...prevState,
                [data.fieldName]: event.target.value,
              };
            });
          });
      });
    };
  }, [fileInfo]);
  // * ========== Get File Information ==========
  useEffect(() => {
    const filePickerTagEl = filePickerTagRef.current;
    const handleGetFile = (event) => {
      setFile(event.target.files);
    };
    filePickerTagEl &&
      filePickerTagEl.addEventListener("change", handleGetFile);
    return () => {
      filePickerTagEl &&
        filePickerTagEl.removeEventListener("change", handleGetFile);
    };
  }, [file]);
  /// * ========== Handle Input File Picker clickable ==========
  useEffect(() => {
    const filePickerEl = filePickerTagRef.current;
    const uploadContentEl = uploadContentRef.current;
    uploadContentEl.addEventListener("click", (e) => {
      filePickerEl.click();
    });
  }, []);
  // * ========== Handle Event ==========
  useEffect(() => {
    const handleOnSubmit = (e) => {
      const isConfirm =
        validateObjectWithKeyList(["fileName", "description"], fileInfo) &&
        file;

      if (isConfirm) {
        // ? Set image infomation
        getImageInfo({
          file: file[0],
          ...fileInfo,
        });
        setIsSubmitSuccess("success");
      } else {
        // ! Warn
        console.log("Information is not enough");
      }
    };

    const submitBtnEl = submitBtnRef.current;
    submitBtnEl && submitBtnEl.addEventListener("click", handleOnSubmit);
    return () =>
      submitBtnEl && submitBtnEl.removeEventListener("click", handleOnSubmit);
  }, [file, fileInfo]);
  return (
    <div className={`${cx("single-img-upload-wrapper")} grid`}>
      <div className="row">
        <div className="c-12 gutter">
          <section className={cx("single-img-upload-body")}>
            {renderInputFields()}
            <form action="#" method="post" encType="multipart/form-data">
              <input type="file" ref={filePickerTagRef} />
              <div
                className={cx("single-img-upload-content-wrapper")}
                ref={uploadContentRef}
              >
                <FontAwesomeIcon
                  icon={faCloudArrowUp}
                  className={cx("single-img-upload-content-icon")}
                />
                <span className={cx("single-img-upload-content-text")}>
                  Drag your documents,photo,video here to start uploading
                </span>
              </div>
            </form>
          </section>
        </div>
      </div>
      <div className="row">
        <div className="c-12 gutter">
          <footer className={`${cx("single-img-upload-footer")} grid`}>
            <div className="row">
              {/* <div className="c-6 gutter">
            <Button size="small" type="primary" maxSize>
              Cancel
            </Button>
          </div> */}
              <div className="c-12 gutter">
                <Button
                  ref={submitBtnRef}
                  size="small"
                  type="primary"
                  maxSize
                  status={isSubmitSuccess}
                >
                  Add your file
                </Button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default SingleImageUploadModal;
