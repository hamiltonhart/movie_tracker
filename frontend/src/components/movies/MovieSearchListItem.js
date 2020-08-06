import React from "react";

const MovieSearchListItem = (movie) => {
  const POSTER_PATH = "http://image.tmdb.org/t/p/w154";

  return (
    <div>
      <h2>
        {`${movie.movie.title}`}{" "}
        {movie.movie.release_date &&
          `(${movie.movie.release_date.slice(0, 4)})`}
      </h2>
      <img
        src={`${POSTER_PATH}${movie.movie.poster_path}`}
        alt={movie.movie.title}
      />
    </div>
  );
};

export default MovieSearchListItem;
