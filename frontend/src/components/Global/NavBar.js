import React from "react";
import { Link } from "@reach/router";

import { NavBarStyle } from "../styles/Navigation";
import { CloseButton } from "./CloseButton";

export const NavBar = ({ toggle }) => {
  return (
    <NavBarStyle>
      <CloseButton toggleDetail={toggle} />
      <ul>
        <li>
          <Link to="/" onClick={toggle}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/collections" onClick={toggle}>
            Movies
          </Link>
        </li>
        <li>
          <Link to="/plants" onClick={toggle}>
            Plants
          </Link>
        </li>
      </ul>
    </NavBarStyle>
  );
};
