import React from "react";

import { UpdateMovieCollection } from "./UpdateMovieCollection";

export const EditCollection = ({ toggle, id, collectionTitle }) => {
  return (
    <div>
      <UpdateMovieCollection
        toggle={toggle}
        id={id}
        collectionTitle={collectionTitle}
      />
    </div>
  );
};
