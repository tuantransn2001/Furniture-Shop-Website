import React, { useState, forwardRef } from "react";

import LabelTag from "./LabelTag/LabelTag";
import Input from "./Input/Input";
import DropDown from "~/components/helpers/DropDown/DropDown";
import InputContext from "./InputFieldContext";
import classNames from "classnames/bind";
import style from "./InputField.module.scss";
const cx = classNames.bind(style);

const InputField = (props, ref) => {
  const {
    label,
    type,
    fieldName,
    isRequire,
    placeholder,
    description,
    options,
    customStyle,
    regex_check_type,
    onChange,
  } = props;
  const [inputType, setInputType] = useState(type);
  const InputContextProps = {
    label,
    type,
    inputType,
    fieldName,
    placeholder,
    customStyle,
    regex_check_type,
    isRequire,
  };
  const renderDataPicker = () => {
    switch (type) {
      case "dropdown": {
        return <DropDown ref={ref} options={options} />;
      }
      default: {
        return (
          <Input
            ref={ref}
            description={description}
            setInputType={setInputType}
            onChange={onChange}
          />
        );
      }
    }
  };

  return (
    <InputContext.Provider value={InputContextProps}>
      <div className={cx("form-wrapper")}>
        {label && <LabelTag />}
        {renderDataPicker()}
      </div>
    </InputContext.Provider>
  );
};
export default forwardRef(InputField);
