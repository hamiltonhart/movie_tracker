import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { CREATE_COLLECTION_ITEM, MOVIE_COLLECTION } from "../../gql";
import { Error } from "../Global";

import { makeStyles, Button } from "@material-ui/core";

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
  const [comments, setComments] = useState("");
  const [rating, setRating] = useState(0);

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
        comments,
        rating,
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
    <div className={classes.root}>
      <Button
        className={classes.button}
        color="secondary"
        variant="contained"
        fullWidth
        onClick={() => handleClick()}
      >
        Add
      </Button>
      {error && <Error message={error.message} />}
    </div>
  );
};
