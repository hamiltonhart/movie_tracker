import React from "react";
import MovieSearchListItem from "./MovieSearchListItem";

const MovieSearchList = ({ collectionId, movieList, toggle }) => {
  return (
    <div>
      {movieList.map((movie) => (
        <MovieSearchListItem
          key={movie.id}
          collectionId={collectionId}
          movie={movie}
          toggle={toggle}
        />
      ))}
    </div>
  );
};

export default MovieSearchList;
