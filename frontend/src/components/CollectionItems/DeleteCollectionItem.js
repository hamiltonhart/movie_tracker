import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_COLLECTION_ITEM, MOVIE_COLLECTION } from "../../gql";
import {
  NoBorderButton,
  PrimaryButton,
  SecondaryButton,
} from "../styles/Buttons";
import { Error } from "../Global";

export const DeleteCollectionItem = ({ id, collectionId, toggle }) => {
  // Count is for Delete confirmation. See handleDelete.
  const [deleteCount, setDeleteCount] = useState(0);

  const [deleteCollectionItem, { loading, error }] = useMutation(
    DELETE_COLLECTION_ITEM
  );

  // Increments the deleteCount state by one if it is less than 2. deleteCollectionItem Mutation is executed on the count of 2 (third click)
  const handleDelete = (e) => {
    e.stopPropagation();
    if (deleteCount === 2) {
      deleteCollectionItem({
        variables: { id },
        refetchQueries: [
          {
            query: MOVIE_COLLECTION,
            variables: { id: collectionId },
          },
        ],
        // This toggle hides the Item from the list. Can remove if the list component rerenders after an update
        onCompleted: toggle(),
      });
    } else {
      setDeleteCount(deleteCount + 1);
    }
  };

  // Shows a different Delete button when Delete is pressed to allow for confirmation.
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
        <PrimaryButton
          delete
          disabled={loading}
          onClick={(e) => handleDelete(e)}
        >
          Get Rid Of It!
        </PrimaryButton>
      )}
      {error && <Error message={error.message} />}
    </>
  );
};
