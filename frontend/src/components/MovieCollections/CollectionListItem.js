import React from "react";
import { Link } from "@reach/router";

export const CollectionListItem = ({ id, title }) => {
  return (
    <div>
      <Link to={`collections/${id}`}>
        <h3>{title}</h3>
      </Link>
    </div>
  );
};
