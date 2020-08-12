import React from "react";
import { useMutation } from "@apollo/react-hooks";

import { DELETE_COLLECTION, MOVIE_COLLECTIONS } from "../../gql";
import { Error } from "../global";

export const DeleteCollection = ({ id }) => {
  const [deleteMovieCollection, { error }] = useMutation(DELETE_COLLECTION);

  const handleDelete = () => {
    deleteMovieCollection({
      variables: { id },
      refetchQueries: [{ query: MOVIE_COLLECTIONS }],
    });
  };

  return (
    <div>
      {error && <Error message={error.message} />}
      <button onClick={() => handleDelete()}>Delete</button>
    </div>
  );
};
