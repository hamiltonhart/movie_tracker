import React from "react";

const MovieSearchListItem = (movie) => {
  return (
    <div>
      <h2>
        {`${movie.movie.title}`}{" "}
        {movie.movie.release_date &&
          `(${movie.movie.release_date.slice(0, 4)})`}
      </h2>
      <p>{movie.movie.overview}</p>
    </div>
  );
};

export default MovieSearchListItem;
