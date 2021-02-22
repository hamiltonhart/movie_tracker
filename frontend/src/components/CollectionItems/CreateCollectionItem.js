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
  imdbId,
  releaseYear,
  picPath,
  toggle,
}) => {
  const [createCollectionItem, { error }] = useMutation(CREATE_COLLECTION_ITEM);
  const handleClick = () => {
    createCollectionItem({
      variables: {
        movieCollectionId,
        title,
        tmdbId,
        summary,
        imdbId,
        releaseYear,
        picPath,
      },
      refetchQueries: [
        { query: MOVIE_COLLECTION, variables: { id: movieCollectionId } },
      ],
      onCompleted: handleCompleted(),
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
