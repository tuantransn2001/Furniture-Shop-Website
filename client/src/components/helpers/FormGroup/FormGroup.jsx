import React, { useState } from "react";
import { validateUserInputByRegex } from "~/common/common";
import Button from "~/components/helpers/Button/Button";
import InputField from "./InputField/InputField";
import FormGroupContext from "./FormGroupContext";
const FormGroup = ({
  formFieldsData,
  getUserDataGetterObj,
  customSubmitBtnStyle,
  actionButtonRef,
  actionBtnColumn,
  formCustomStyle,
  action,
}) => {
  let buttonStatus = "";
  const fieldNameList = formFieldsData.map((el) => el.fieldName);
  // ? Final result
  const [userInputComplete, getUserInputComplete] = useState({});
  // ? Handle change button status base on process
  // * Warm field in-correct

  const [inCorrectFieldList, setInCorrectFieldList] = useState([]);

  const handleSubmitButtonOnClick = () => {
    // ? ============================ Handle send data back to local state =======================================
    const correctDataList = []; // ? If length === fieldNameList -> correct -> send back
    const correctFieldNameList = []; // ? If length === fieldNameList -> correct -> send back
    // ? get correct data
    for (let key in userInputComplete) {
      // ? Check data isCorrect or not
      if (userInputComplete[key].isCorrect) {
        correctDataList.push(userInputComplete[key].data);
        correctFieldNameList.push(key);
      }
    }

    const isDataListValid = fieldNameList.length === correctDataList.length;
    if (isDataListValid) {
      // ? Case is all filled -> Check isCorrect -> true: Send back to local state
      // !                                       -> fail: Warn field
      getUserDataGetterObj((prev) => {
        const updateUserInputComplete = {};
        for (let key in userInputComplete) {
          updateUserInputComplete[key] = userInputComplete[key].data;
        }

        return { ...updateUserInputComplete };
      });
    }

    const handleFormatInCorrectFieldNameList = () => {
      const inCorrectFieldNames = fieldNameList.map((el) => {
        const isCorrectKey = correctFieldNameList.includes(el);

        if (!isCorrectKey) {
          return el;
        }
      });
      for (let index = 0; index <= inCorrectFieldNames.length; index++) {
        if (inCorrectFieldNames[index] === undefined) {
          inCorrectFieldNames.splice(index, 1);
        }
      }

      return inCorrectFieldNames;
    };

    setInCorrectFieldList((prev) => {
      return [...handleFormatInCorrectFieldNameList()];
    });
  };

  const renderFormFields = () => {
    return formFieldsData.map((fieldData, index) => {
      const {
        label,
        isRequire,
        type,
        fieldName,
        placeholder,
        description,
        options,
        customStyle,
        regex_check_type,
      } = fieldData;

      const handleInputFieldOnChange = (e) => {
        const userInput = e.target.value;

        const isUserInputCorrect = validateUserInputByRegex(
          regex_check_type,
          userInput
        );

        getUserInputComplete((prev) => {
          return {
            ...prev,
            [fieldName]: { isCorrect: isUserInputCorrect, data: userInput },
          };
        });
      };

      return (
        <div className={`c-${fieldData.columnNum} gutter`} key={index}>
          <InputField
            {...{
              label,
              type,
              fieldName,
              placeholder,
              description,
              options,
              customStyle,
              regex_check_type,
              isRequire,
            }}
            onChange={handleInputFieldOnChange}
          />
        </div>
      );
    });
  };

  return (
    <FormGroupContext.Provider
      value={{
        formFieldsData,
        buttonStatus,
        getUserInputComplete,
        inCorrectFieldList,
        userInputComplete,
      }}
    >
      <div className="grid" style={formCustomStyle}>
        <div className="row">
          {renderFormFields()}
          <div
            className={`c-${
              actionBtnColumn ? actionBtnColumn : 12
            } gutter mt-1`}
          >
            <Button
              ref={actionButtonRef}
              size="medium"
              type="primary"
              maxSize
              status={buttonStatus}
              onClick={() => {
                handleSubmitButtonOnClick();
              }}
              customStyle={customSubmitBtnStyle}
            >
              {action ? action : "Submit"}
            </Button>
          </div>
        </div>
      </div>
    </FormGroupContext.Provider>
  );
};

export default FormGroup;
