import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  UPDATE_COLLECTION,
  MOVIE_COLLECTION,
} from "../../gql/MovieCollectionGQL";
import { Error } from "../Global";

import { makeStyles, TextField, Button, Typography } from "@material-ui/core";

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
          <Button variant="outlined" size="large" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            as="input"
            type="submit"
            size="large"
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </div>
        <Button onClick={toggleDelete}>Delete</Button>
        {error && <Error message={error.message} />}
      </form>
    </>
  );
};
