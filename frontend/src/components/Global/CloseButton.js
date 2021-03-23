import React from "react";
import { CloseButtonStyle } from "../styles/Buttons";
import closeIcon from "../../images/icon-close.svg";

export const CloseButton = ({ onClick }) => {
  return (
    <CloseButtonStyle onClick={onClick}>
      <img src={closeIcon} alt="" />
    </CloseButtonStyle>
  );
};
