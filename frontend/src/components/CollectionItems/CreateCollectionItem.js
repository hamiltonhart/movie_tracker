import React, { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";

import {
  CREATE_COLLECTION_ITEM,
  MOVIE_COLLECTION_AND_ITEMS,
  UPDATE_COLLECTION_ITEM,
} from "../../gql";
import { CollectionContext } from "../../pages/CollectionPage";
import { Error } from "../Global";

import { PrimaryButton } from "../styles/Buttons";
import { findMatch } from "./utilities/findMatch";
import { movieSortingABC } from "../../utilities";

export const CreateCollectionItem = ({
  movieCollectionId,
  tmdbId,
  title,
  summary,
  releaseYear,
  picPath,
}) => {
  const context = useContext(CollectionContext);

  const handleCompleted = () => {
    context.toggleAdd();
  };

  /*
  Handles updating the Apollo cache for the Movie Collection Mutation. Also present in CreateCollectionItemManual.
  The cache is sorted in alphabetical order in order to properly display.
  */
  const handleUpdateCache = (cache, { data }) => {
    const fullQuery = cache.readQuery({
      query: MOVIE_COLLECTION_AND_ITEMS,
      variables: { id: movieCollectionId, collectionId: movieCollectionId },
    });

    const movieCollection = fullQuery.movieCollection;
    let collectionItems = fullQuery.collectionItems;
    const newItem = data.createCollectionItem.collectionItem;

    collectionItems = collectionItems.concat(newItem);
    collectionItems = movieSortingABC(collectionItems);

    cache.writeQuery({
      query: MOVIE_COLLECTION_AND_ITEMS,
      variables: { id: movieCollectionId, collectionId: movieCollectionId },
      data: { movieCollection, collectionItems },
    });
  };

  const [createCollectionItem, { error }] = useMutation(
    CREATE_COLLECTION_ITEM,
    { update: handleUpdateCache, onCompleted: handleCompleted }
  );

  const [updateCollectionItem, { error: updateError }] = useMutation(
    UPDATE_COLLECTION_ITEM,
    { onCompleted: handleCompleted }
  );

  const handleClick = () => {
    const matchFound = findMatch({
      items: context.collectionItems,
      title,
      releaseYear,
    });
    if (matchFound) {
      updateCollectionItem({ variables: { id: matchFound, views: 1 } });
    } else {
      createCollectionItem({
        variables: {
          movieCollectionId,
          title,
          tmdbId,
          summary,
          releaseYear,
          picPath,
        },
      });
    }
  };

  return (
    <div style={{ marginBottom: "var(--lgSpacing)" }}>
      <PrimaryButton fullwidth onClick={() => handleClick()}>
        Add
      </PrimaryButton>
      {error && <Error message={error.message} />}
      {updateError && <Error message={updateError.message} />}
    </div>
  );
};
