// ? Selector
export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);
// ? Check object is empty or not
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};
// ? Logger
export const logger = (consoleType, message) => {
  // ? type is log , warn , err
  switch (consoleType) {
    case "log": {
      console.log(message);
      break;
    }
    case "warn": {
      console.warn(message);
      break;
    }
    case "error": {
      console.error(message);
      break;
    }
    default: {
      console.error("ARGS IS PASSING WRONG!");
    }
  }
};
// ? Truncate string
export const trunc = (str, limitNum) => {
  return str.length > limitNum ? str.slice(0, limitNum) + "..." : str;
};

// ? Validate input
export const validateUserInputByRegex = (regexCheckType, userInput) => {
  const regexChecker = {
    email: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
    string: /^[a-zA-Z\d\s]{2,}$/,
    number: /^[0-9]+$/,
    letter: /^([a-zA-Z0-9])*/,
    password:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  };

  return regexChecker[regexCheckType].test(userInput);
};
// ? Check user information
export const validateObjectWithKeyList = (keys, userInfo) => {
  // ? keys is array store fields
  if (isEmpty(userInfo) || keys.length === 0) {
    return false;
  } else {
    return keys.every((el) => {
      return userInfo.hasOwnProperty(el);
    });
  }
};
// ? Add in-correct class into target class
export const handleWarnFieldNotFill = (targetClass) => {
  const inputWrapperEls = $$(`.${targetClass}`);
  inputWrapperEls.forEach((inputWrapperEl) => {
    const isFill = inputWrapperEl.classList.contains("correct");
    if (!isFill) {
      inputWrapperEl.classList.add("in-correct");
    }
  });
};

// ? Reload page
export const reloadPage = () => {
  window.location.reload();
};
// ?
export const handleCalculateSubtotal = (targetArr) => {
  const initialSubtotal = 0;
  return targetArr.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.unit_price * currentItem.quantity;
  }, initialSubtotal);
};
// ?
export const findIndexByKey = (key, value, arr) => {
  return arr.findIndex((el) => {
    return el[key] === value;
  });
};
