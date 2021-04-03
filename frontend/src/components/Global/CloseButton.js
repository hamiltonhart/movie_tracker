import React from "react";
import { CloseButtonStyle } from "../styles/Buttons";
import closeIcon from "../../images/icon-close.svg";

export const CloseButton = ({ toggleDetail }) => {
  return (
    <CloseButtonStyle onClick={toggleDetail}>
      <img src={closeIcon} alt="" />
    </CloseButtonStyle>
  );
};
