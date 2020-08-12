import React from "react";
import { CreateCollectionItem } from "../CollectionItems";

const MovieSearchListItem = (movie) => {
  const POSTER_PATH = "http://image.tmdb.org/t/p/w154";

  return (
    <div>
      <h2>
        {`${movie.movie.title}`}{" "}
        {movie.movie.release_date &&
          `(${movie.movie.release_date.slice(0, 4)})`}
      </h2>
      <p>{`Movie ID ${movie.movie.id}`}</p>
      <p>{`Summary: ${movie.movie.overview}`}</p>
      <img
        src={`${POSTER_PATH}${movie.movie.poster_path}`}
        alt={movie.movie.title}
      />
      <CreateCollectionItem
        movieCollectionId={1}
        title={movie.movie.title}
        tmdbId={movie.movie.id}
        summary={movie.movie.overview}
        picPath={movie.movie.poster_path}
        imdb_id={movie.movie.imdb_id ? movie.movie.imdb_id : "0"}
        releaseYear={
          movie.movie.release_date ? movie.movie.release_date.slice(0, 4) : 0
        }
      />
    </div>
  );
};

export default MovieSearchListItem;
