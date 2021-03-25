import React from "react";
import { useMutation } from "@apollo/react-hooks";

import { CREATE_COLLECTION_ITEM, MOVIE_COLLECTION_AND_ITEMS } from "../../gql";
import { Error } from "../Global";

import { PrimaryButton } from "../styles/Buttons";

export const CreateCollectionItem = ({
  movieCollectionId,
  tmdbId,
  title,
  summary,
  releaseYear,
  picPath,
  toggle,
}) => {
  const handleCompleted = () => {
    toggle();
  };

  // Handles updating the Apollo cache for the Movie Collection Mutation. Also present in CreateCollectionItemManual.
  const handleUpdateCache = (cache, { data }) => {
    const fullQuery = cache.readQuery({
      query: MOVIE_COLLECTION_AND_ITEMS,
      variables: { id: movieCollectionId, collectionId: movieCollectionId },
    });

    const movieCollection = fullQuery.movieCollection;
    let collectionItems = fullQuery.collectionItems;
    const newItem = data.createCollectionItem.collectionItem;

    collectionItems = collectionItems.concat(newItem);

    cache.writeQuery({
      query: MOVIE_COLLECTION_AND_ITEMS,
      variables: { id: movieCollectionId, collectionId: movieCollectionId },
      data: { movieCollection, collectionItems },
    });

    // handleCompleted();
  };

  const [createCollectionItem, { error }] = useMutation(
    CREATE_COLLECTION_ITEM,
    { update: handleUpdateCache, onCompleted: handleCompleted }
  );
  const handleClick = () => {
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
  };

  return (
    <>
      <PrimaryButton fullwidth onClick={() => handleClick()}>
        Add
      </PrimaryButton>
      {error && <Error message={error.message} />}
    </>
  );
};
