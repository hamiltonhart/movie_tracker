import React from "react";
import { Link } from "@reach/router";

import { LinkHeadingStyle } from "../styles/Typography";

export const CollectionListItem = ({ id, title }) => {
  return (
    <LinkHeadingStyle name={title} as={Link} to={`/collections/${id}`}>
      {title}
    </LinkHeadingStyle>
  );
};
