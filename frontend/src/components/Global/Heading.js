import React from "react";

import { HeadingStyle } from "../styles/HeadingStyle";
import { SiteHeading } from "../styles/Typography";
import { Link } from "@reach/router";

export const Heading = () => {
  return (
    <HeadingStyle name="site-heading">
      <Link to="/">
        <SiteHeading>BMDb</SiteHeading>
      </Link>
    </HeadingStyle>
  );
};
