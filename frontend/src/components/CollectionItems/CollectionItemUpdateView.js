import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_COLLECTION_ITEM } from "../../gql";
import { NoBorderButton } from "../styles/Buttons";
import { CollectionContext } from "../../pages/CollectionPage";
import { CollectionListContext } from "./CollectionItemsList";
import { movieSortingABC } from "../../utilities";
import { Error } from "../Global";

// Using the collectionItemId provided, the CollectionItem view count is incremented by one.
export const CollectionItemUpdateView = ({
  collectionItemId,
  toggleDetail,
}) => {
  const context = useContext(CollectionContext);
  const collectionListContext = useContext(CollectionListContext);

  const handleCompleted = () => {
    collectionListContext.setListItems(
      movieSortingABC(context.collectionItems)
    );
    toggleDetail();
  };

  const [updateCollectionItem, { error }] = useMutation(
    UPDATE_COLLECTION_ITEM,
    {
      variables: { id: collectionItemId, views: 1 },
      onCompleted: handleCompleted,
    }
  );

  const handleUpdateClick = () => {
    updateCollectionItem();
  };
  return (
    <>
      {error && <Error message={error.message} />}
      <NoBorderButton onClick={() => handleUpdateClick()}>
        Add View
      </NoBorderButton>
    </>
  );
};
