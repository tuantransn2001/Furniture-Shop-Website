import React, { useState } from "react";
// ? Styled component
import { TooltipWrapper, PromptText } from "./TooltipStyled";
const Tooltip = (props) => {
  const {
    children,
    placement,
    promptText,
    backgroundColor,
    textColor,
    layer,
    alwayShow,
    disable,
    includeCloseBtn,
  } = props;
  const [isClick, setIsClick] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const showPrompText = isClick || isHover || alwayShow ? true : false;
  return (
    <TooltipWrapper
      maxSize
      onFocus={() => {
        setIsClick(true);
      }}
      onBlur={() => {
        setIsClick(false);
      }}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      {children}
      <PromptText
        backgroundColor={backgroundColor}
        textColor={textColor}
        layer={layer}
        isShow={showPrompText}
        disable={disable}
        placement={placement}
        isAlwayShow={alwayShow}
        isIncludeCloseBtn={includeCloseBtn}
      >
        {promptText}
      </PromptText>
    </TooltipWrapper>
  );
};

export default Tooltip;
