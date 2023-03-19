import styled from "styled-components";
export const TooltipWrapper = styled.div`
  position: relative;
  /* width: ${(props) => props.maxSize && `100%;`}; */
`;
// ? Include closebtn -> Toast
// ? Do not include closebtn -> Tooltip
export const PromptText = styled.div`
  position: absolute;
  width: max-content;
  color: ${(props) => props.textColor || "#fff"};
  padding: 1rem 1.6rem;
  font-size: 1.2rem;
  font-weight: 500;
  border-radius: 0.3rem;
  background-color: ${(props) => props.backgroundColor || "#333"};
  ${(props) => {
    switch (props.placement) {
      case "top": {
        return `
            bottom: calc( 100% + 1rem );
            left: 50%;
            transform: translateX(-50%);
            &::after{
                content: "";
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-top: 0.6rem solid ${props.backgroundColor || "#333"};
                border-right: 0.6rem solid transparent;
                border-left: 0.6rem solid transparent;
            }
        `;
      }
      case "bottom": {
        return `
            top: calc( 100% + 1rem );
            left: 50%;
            transform: translateX(-50%);
            &::after{
                content: "";
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-bottom: 0.6rem solid ${props.backgroundColor || "#333"};
                border-right: 0.6rem solid transparent;
                border-left: 0.6rem solid transparent;
            }
        `;
      }
      case "right": {
        return `
            left: calc( 100% + 1rem );
            top: 50%;
            transform: translateY(-50%);
            &::after{
                content: "";
                position: absolute;
                right: 100%;
                top: 50%;
                transform: translateY(-50%);
                width: 0;
                height: 0;
                border-right: 0.6rem solid ${props.backgroundColor || "#333"};
                border-top: 0.6rem solid transparent;
                border-bottom: 0.6rem solid transparent;
            }
        `;
      }
      case "left": {
        return `
            right: calc( 100% + 1rem );
            top: 50%;
            transform: translateY(-50%);
            &::after{
                content: "";
                position: absolute;
                left: 100%;
                top: 50%;
                transform: translateY(-50%);
                width: 0;
                height: 0;
                border-left: 0.6rem solid ${props.backgroundColor || "#333"};
                border-top: 0.6rem solid transparent;
                border-bottom: 0.6rem solid transparent;
            }
        `;
      }
      default: {
        return "";
      }
    }
  }}
  display: ${(props) => {
    if (props.isShow) {
      return "block";
    }

    return "none";
  }};

  z-index: ${(props) => props.layer || 999};
`;
