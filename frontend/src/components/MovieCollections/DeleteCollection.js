import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { navigate } from "@reach/router";
import {
  DELETE_COLLECTION,
  MOVIE_COLLECTIONS,
} from "../../gql/MovieCollectionGQL";
import { Error } from "../Global";

import {
  NoBorderButton,
  SecondaryButton,
  PrimaryButton,
} from "../styles/Buttons";

export const DeleteCollection = ({ id }) => {
  const [deleteCount, setDeleteCount] = useState(0);

  const [deleteMovieCollection, { error }] = useMutation(DELETE_COLLECTION);

  const handleDelete = (e) => {
    if (deleteCount !== 2) {
      setDeleteCount(deleteCount + 1);
    } else {
      e.preventDefault();
      deleteMovieCollection({
        variables: { id },
        refetchQueries: [{ query: MOVIE_COLLECTIONS }],
        onCompleted: handleCompleted(),
      });
    }
  };

  const handleCompleted = () => {
    navigate("/");
  };

  return (
    <>
      {deleteCount === 0 && (
        <NoBorderButton delete fullwidth onClick={(e) => handleDelete(e)}>
          Delete
        </NoBorderButton>
      )}
      {deleteCount === 1 && (
        <SecondaryButton delete fullwidth onClick={(e) => handleDelete(e)}>
          Really?
        </SecondaryButton>
      )}
      {deleteCount === 2 && (
        <PrimaryButton delete fullwidth onClick={(e) => handleDelete(e)}>
          Last Chance
        </PrimaryButton>
      )}

      {error && <Error message={error.message} />}
    </>
  );
};
