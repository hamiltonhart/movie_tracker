import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_COLLECTION } from "../../gql/MovieCollectionGQL";

export const CreateMovieCollection = () => {
  const [title, setTitle] = useState("");

  const [createMovieCollection, { error }] = useMutation(CREATE_COLLECTION);

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovieCollection({ variables: { title } });
  };

  return (
    <div>
      <h3>Create A Collection</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="New Collection Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input type="submit" value="Create Collection" />
      </form>
    </div>
  );
};
