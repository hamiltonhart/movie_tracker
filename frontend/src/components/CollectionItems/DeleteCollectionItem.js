import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_COLLECTION_ITEM, MOVIE_COLLECTION_AND_ITEMS } from "../../gql";
import {
  NoBorderButton,
  PrimaryButton,
  SecondaryButton,
} from "../styles/Buttons";
import { Error } from "../Global";

export const DeleteCollectionItem = ({
  id,
  collectionId,
  rerenderList,
  toggleDetail,
}) => {
  // Count is for Delete confirmation. See handleDelete.
  const [deleteCount, setDeleteCount] = useState(0);

  const handleUpdateCache = (cache, { data }) => {
    const fullQuery = cache.readQuery({
      query: MOVIE_COLLECTION_AND_ITEMS,
      variables: { id: collectionId, collectionId: collectionId },
    });

    const movieCollection = fullQuery.movieCollection;
    const collectionItems = fullQuery.collectionItems;
    for (let i = 0; i < collectionItems.length; i++) {
      if (Number(collectionItems[i].id) === data.deleteCollectionItem.id) {
        collectionItems.splice(i, 1);
        break;
      }
    }

    cache.writeQuery({
      query: MOVIE_COLLECTION_AND_ITEMS,
      variables: { id: collectionId, collectionId: collectionId },
      data: { movieCollection, collectionItems },
    });
  };

  const [deleteCollectionItem, { loading, error }] = useMutation(
    DELETE_COLLECTION_ITEM,
    {
      update: handleUpdateCache,
      onCompleted: rerenderList,
    }
  );

  // Increments the deleteCount state by one if it is less than 2. deleteCollectionItem Mutation is executed on the count of 2 (third click)
  const handleDelete = (e) => {
    e.stopPropagation();
    if (deleteCount === 2) {
      deleteCollectionItem({
        variables: { id },
        // refetchQueries: [
        //   {
        //     query: MOVIE_COLLECTION,
        //     variables: { id: collectionId },
        //   },
        // ],
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
          Really?
        </SecondaryButton>
      )}
      {deleteCount === 2 && (
        <PrimaryButton
          delete
          disabled={loading}
          onClick={(e) => handleDelete(e)}
        >
          YES!
        </PrimaryButton>
      )}
      {error && <Error message={error.message} />}
    </>
  );
};
