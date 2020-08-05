import React from "react";
import MovieSearchListItem from "./MovieSearchListItem";

const MovieSearchList = (movieList) => {
  return (
    <div>
      {movieList.movieList.map((movie) => (
        <MovieSearchListItem key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieSearchList;
