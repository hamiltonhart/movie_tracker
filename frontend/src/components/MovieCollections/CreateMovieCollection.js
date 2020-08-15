import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  CREATE_COLLECTION,
  MOVIE_COLLECTIONS,
} from "../../gql/MovieCollectionGQL";
import { Error } from "../Global";

import {
  makeStyles,
  TextField,
  Button,
  Modal,
  Paper,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "85%",
    maxWidth: "85%",
    padding: theme.spacing(3),
  },
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
}));

export const CreateMovieCollection = ({ isShowing, toggle }) => {
  const [title, setTitle] = useState("");

  const [createMovieCollection, { error }] = useMutation(CREATE_COLLECTION);

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovieCollection({
      variables: { title },
      refetchQueries: [{ query: MOVIE_COLLECTIONS }],
      onCompleted: handleCompleted(),
    });
  };

  const handleCompleted = () => {
    setTitle("");
    toggle();
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Modal className={classes.modal} open={isShowing}>
        <Paper className={classes.paper}>
          <Typography variant="h5">New Collection</Typography>
          <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
            <TextField
              label="New Collection Name"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Button
              as="input"
              type="submit"
              size="large"
              variant="contained"
              color="primary"
            >
              Create Collection
            </Button>
            <Button onClick={toggle}>Cancel</Button>
            {error && <Error message={error.message} />}
          </form>
        </Paper>
      </Modal>
    </div>
  );
};
