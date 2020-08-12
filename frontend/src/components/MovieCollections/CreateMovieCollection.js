import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  CREATE_COLLECTION,
  MOVIE_COLLECTIONS,
} from "../../gql/MovieCollectionGQL";
import { Error } from "../global";

export const CreateMovieCollection = () => {
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
  };

  return (
    <div>
      <h2>Create A Collection</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="New Collection Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input type="submit" value="Create Collection" />
        {error && <Error message={error.message} />}
      </form>
    </div>
  );
};
