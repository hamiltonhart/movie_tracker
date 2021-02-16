import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { CREATE_COLLECTION_ITEM, MOVIE_COLLECTION } from "../../gql";
import { Error } from "../Global";

import { makeStyles, Button, TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  form: {
    "& > *": {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  button: {},
}));

export const CreateCollectionItemManual = ({ movieCollectionId, toggle }) => {
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [summary, setSummary] = useState("");

  const [createCollectionItem, { error }] = useMutation(CREATE_COLLECTION_ITEM);
  const handleSubmit = (e) => {
    e.preventDefault();
    createCollectionItem({
      variables: {
        movieCollectionId,
        title,
        summary,
        releaseYear: releaseYear ? releaseYear : 0,
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
      <Typography variant="h6" align="center">
        Or add it here
      </Typography>
      <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
        <TextField
          type="text"
          placeholder="Title (Required)"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          type="text"
          placeholder="Release Year (Required, 4 Digits)"
          fullWidth
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
        />
        <TextField
          type="text"
          placeholder="Summary (Required)"
          variant="outlined"
          multiline
          fullWidth
          rows={5}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />

        <Button
          type="submit"
          className={classes.button}
          size="large"
          color="secondary"
          variant="contained"
          disabled={
            !title ||
            !releaseYear ||
            releaseYear.length !== 4 ||
            isNaN(releaseYear) ||
            !summary
          }
          fullWidth
        >
          Add
        </Button>
      </form>
      {error && <Error message={error.message} />}
    </div>
  );
};