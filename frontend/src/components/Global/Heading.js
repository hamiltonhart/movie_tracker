import React from "react";

import { HeadingStyle } from "../styles/HeadingStyle";
import { SiteHeading } from "../styles/Typography";
import { Link } from "@reach/router";
import { NavBar } from "./NavBar";
import { IconButton } from "./IconButton";
import menuIcon from "../../images/icon-menu.svg";

import { useToggle } from "../utilities/useToggle";

export const Heading = () => {
  const { isShowing, toggle } = useToggle();
  return (
    <HeadingStyle name="site-heading">
      <Link to="/">
        <SiteHeading>BMDb</SiteHeading>
      </Link>
      <IconButton src={menuIcon} alt="Menu Icon" onClick={toggle} />
      {isShowing && <NavBar toggle={toggle} />}
    </HeadingStyle>
  );
};
