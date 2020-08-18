import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { navigate } from "@reach/router";
import {
  DELETE_COLLECTION,
  MOVIE_COLLECTIONS,
} from "../../gql/MovieCollectionGQL";
import { Error } from "../Global";

import { makeStyles, Button, Typography } from "@material-ui/core";

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
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={handleCancel}
        >
          NO! Go Back!
        </Button>
        <Button
          size="large"
          variant="outlined"
          onClick={(e) => handleDelete(e)}
        >
          Delete
        </Button>
        {error && <Error message={error.message} />}
      </div>
    </>
  );
};
