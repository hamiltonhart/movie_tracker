import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  UPDATE_COLLECTION,
  MOVIE_COLLECTION,
} from "../../gql/MovieCollectionGQL";
import { Error } from "../Global";

import { makeStyles, TextField, Typography } from "@material-ui/core";
import { NoBorderButton, PrimaryButton } from "../styles/Buttons";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "100%",
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
  },
}));

export const UpdateMovieCollection = ({
  toggle,
  id,
  collectionTitle,
  toggleDelete,
}) => {
  const [title, setTitle] = useState(collectionTitle);

  const [updateMovieCollection, { error }] = useMutation(UPDATE_COLLECTION);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMovieCollection({
      variables: { id, title },
      refetchQueries: [{ query: MOVIE_COLLECTION, variables: { id: id } }],
      onCompleted: handleCompleted(),
    });
  };

  const handleCompleted = () => {
    setTitle(title);
    toggle();
  };

  const handleCancel = () => {
    setTitle(collectionTitle);
    toggle();
  };

  const classes = useStyles();

  return (
    <>
      <Typography variant="h5">Edit Collection</Typography>
      <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
        <TextField
          label="Collection Name"
          variant="outlined"
          fullWidth
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className={classes.buttons}>
          <NoBorderButton onClick={handleCancel}>Cancel</NoBorderButton>
          <PrimaryButton as="input" type="submit" value="Save" />
        </div>
        <NoBorderButton onClick={toggleDelete}>Delete</NoBorderButton>
        {error && <Error message={error.message} />}
      </form>
    </>
  );
};
