import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { CREATE_COLLECTION_ITEM } from "../../gql";
import { Error } from "../Global";

export const CreateCollectionItem = ({
  movieCollectionId,
  tmdbId,
  title,
  summary,
  imdbId,
  releaseYear,
  picPath,
}) => {
  const [comments, setComments] = useState("");
  const [rating, setRating] = useState(0);

  const [createCollectionItem, { error }] = useMutation(CREATE_COLLECTION_ITEM);
  const handleClick = () => {
    createCollectionItem({
      variables: {
        movieCollectionId,
        title,
        tmdbId,
        summary,
        imdbId,
        releaseYear,
        picPath,
        comments,
        rating,
      },
    });
  };
  return (
    <div>
      <button onClick={() => handleClick()}>Add to Collection</button>
      {error && <Error message={error.message} />}
    </div>
  );
};
