import React from "react";
import { useMutation } from "@apollo/react-hooks";

import { CREATE_COLLECTION_ITEM, MOVIE_COLLECTION } from "../../gql";
import { Error } from "../Global";

import { makeStyles } from "@material-ui/core";
import { PrimaryButton } from "../styles/Buttons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  button: {},
}));

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
  const classes = useStyles();

  return (
    <>
      <PrimaryButton fullwidth onClick={() => handleClick()}>
        Add
      </PrimaryButton>
      {error && <Error message={error.message} />}
    </>
  );
};
