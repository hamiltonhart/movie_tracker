import React from "react";

import { useToggle } from "../utilities";

import { DeleteCollection } from "./DeleteCollection";
import { UpdateMovieCollection } from "./UpdateMovieCollection";

export const EditCollectionModal = ({ toggle, id, collectionTitle }) => {
  const { isShowing: isShowingDelete, toggle: toggleDelete } = useToggle();

  return (
    <div>
      <DeleteCollection
        isShowing={isShowingDelete}
        toggle={toggleDelete}
        id={id}
      />

      <UpdateMovieCollection
        toggle={toggle}
        id={id}
        collectionTitle={collectionTitle}
        toggleDelete={toggleDelete}
      />
    </div>
  );
};
