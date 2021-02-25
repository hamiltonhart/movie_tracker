import React from "react";
import { Heading } from "./Heading";

import { PrimaryLayoutStyle } from "../styles/PrimaryLayoutStyle";

export const PrimaryLayout = ({ children }) => {
  return (
    <>
      <Heading />
      <PrimaryLayoutStyle>
        <div>{children}</div>
      </PrimaryLayoutStyle>
    </>
  );
};
