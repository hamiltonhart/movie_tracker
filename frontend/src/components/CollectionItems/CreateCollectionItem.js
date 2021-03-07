import React from "react";
import { useMutation } from "@apollo/react-hooks";

import { CREATE_COLLECTION_ITEM, MOVIE_COLLECTION } from "../../gql";
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
  // Handles updating the Apollo cache for the Movie Collection Mutation. Also present in CreateCollectionItemManual.
  const handleUpdateCache = (cache, { data }) => {
    const fullQuery = cache.readQuery({
      query: MOVIE_COLLECTION,
      variables: { id: movieCollectionId },
    });
    let items = fullQuery.movieCollection;
    const newItem = data.createCollectionItem.collectionItem;

    items.movies = items.movies.concat(newItem);

    cache.writeQuery({
      query: MOVIE_COLLECTION,
      variables: { id: movieCollectionId },
      data: { movieCollection: items },
    });

    handleCompleted();
  };

  const [createCollectionItem, { error }] = useMutation(
    CREATE_COLLECTION_ITEM,
    { update: handleUpdateCache }
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

  const handleCompleted = () => {
    toggle();
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
