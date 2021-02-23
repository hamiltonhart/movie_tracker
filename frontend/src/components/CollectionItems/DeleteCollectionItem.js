import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_COLLECTION_ITEM, MOVIE_COLLECTION } from "../../gql";
import {
  NoBorderButton,
  PrimaryButton,
  SecondaryButton,
} from "../styles/Buttons";
import { Error } from "../Global";

export const DeleteCollectionItem = ({ id, collectionId }) => {
  const [deleteCount, setDeleteCount] = useState(0);
  const [deleteCollectionItem, { error }] = useMutation(DELETE_COLLECTION_ITEM);

  const handleDelete = (e) => {
    if (deleteCount === 2) {
      e.stopPropagation();
      deleteCollectionItem({
        variables: { id },
        refetchQueries: [
          { query: MOVIE_COLLECTION, variables: { id: collectionId } },
        ],
      });
    } else {
      setDeleteCount(deleteCount + 1);
    }
  };

  return (
    <>
      {deleteCount === 0 && (
        <NoBorderButton delete onClick={(e) => handleDelete(e)}>
          Remove
        </NoBorderButton>
      )}
      {deleteCount === 1 && (
        <SecondaryButton delete onClick={(e) => handleDelete(e)}>
          Are you sure?
        </SecondaryButton>
      )}
      {deleteCount === 2 && (
        <PrimaryButton delete onClick={(e) => handleDelete(e)}>
          Get Rid Of It!
        </PrimaryButton>
      )}
      {error && <Error message={error.message} />}
    </>
  );
};
