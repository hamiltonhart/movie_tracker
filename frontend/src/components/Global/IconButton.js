import React from "react";
import { IconButtonStyle } from "../styles/Buttons";

export const IconButton = ({ src, alt, onClick }) => {
  return (
    <IconButtonStyle onClick={onClick}>
      <img src={src} alt={alt} />
    </IconButtonStyle>
  );
};
