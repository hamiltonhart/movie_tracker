import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  UPDATE_COLLECTION,
  MOVIE_COLLECTION,
} from "../../gql/MovieCollectionGQL";
import { Error } from "../Global";

import { makeStyles, TextField, Typography } from "@material-ui/core";
import { NoBorderButton, PrimaryButton } from "../styles/Buttons";
import { FormStyle, TextInputStyle } from "../styles/Forms";

const useStyles = makeStyles((theme) => ({}));

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
      <FormStyle className={classes.form} onSubmit={(e) => handleSubmit(e)}>
        <TextInputStyle
          fullwidth
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <PrimaryButton as="input" type="submit" fullwidth value="Save" />
        <NoBorderButton fullwidth onClick={handleCancel}>
          Cancel
        </NoBorderButton>

        <NoBorderButton fullwidth onClick={toggleDelete}>
          Delete
        </NoBorderButton>
        {error && <Error message={error.message} />}
      </FormStyle>
    </>
  );
};
