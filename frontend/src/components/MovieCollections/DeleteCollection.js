import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { navigate } from "@reach/router";
import {
  DELETE_COLLECTION,
  MOVIE_COLLECTIONS,
} from "../../gql/MovieCollectionGQL";
import { Error } from "../Global";

import { makeStyles, Button, Typography } from "@material-ui/core";
import { NoBorderButton, PrimaryButton } from "../styles/Buttons";

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    marginTop: theme.spacing(2),
  },
}));

export const DeleteMovieCollection = ({ isShowing, toggle, id }) => {
  const [deleteMovieCollection, { error }] = useMutation(DELETE_COLLECTION);

  const handleDelete = (e) => {
    e.preventDefault();
    deleteMovieCollection({
      variables: { id },
      refetchQueries: [{ query: MOVIE_COLLECTIONS }],
      onCompleted: handleCompleted(),
    });
  };

  const handleCompleted = () => {
    toggle();
    navigate("/");
  };

  const handleCancel = () => {
    toggle();
  };

  const classes = useStyles();

  return (
    <>
      <Typography variant="h5">Delete Collection?</Typography>
      <div className={classes.buttons}>
        <PrimaryButton onClick={handleCancel}>NO! Go Back!</PrimaryButton>
        <NoBorderButton onClick={(e) => handleDelete(e)}>Delete</NoBorderButton>
        {error && <Error message={error.message} />}
      </div>
    </>
  );
};
