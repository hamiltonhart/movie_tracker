import React from "react";
import { CreateCollectionItem } from "../CollectionItems";

const MovieSearchListItem = ({ collectionId, movie }) => {
  const POSTER_PATH = "http://image.tmdb.org/t/p/w154";

  return (
    <div>
      <h2>
        {`${movie.title}`}{" "}
        {movie.release_date && `(${movie.release_date.slice(0, 4)})`}
      </h2>
      <p>{`Movie ID ${movie.id}`}</p>
      <p>{`Summary: ${movie.overview}`}</p>
      <img src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
      <CreateCollectionItem
        movieCollectionId={collectionId}
        title={movie.title}
        tmdbId={movie.id}
        summary={movie.overview}
        picPath={movie.poster_path}
        imdb_id={movie.imdb_id ? movie.imdb_id : "0"}
        releaseYear={movie.release_date ? movie.release_date.slice(0, 4) : 0}
      />
    </div>
  );
};

export default MovieSearchListItem;
