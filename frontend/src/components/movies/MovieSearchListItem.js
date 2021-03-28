import React from "react";
import { AnimatePresence } from "framer-motion";

import { CollectionCard } from "../CollectionItems/CollectionCard";
import { MovieSearchItemDetail } from "./MovieSearchItemDetail";
import { useToggle } from "../utilities";

const MovieSearchListItem = ({ collectionId, movie, toggle }) => {
  const { toggle: toggleDetail, isShowing: isShowingDetail } = useToggle();

  return (
    <>
      <CollectionCard
        onClick={toggleDetail}
        title={movie.title}
        picPath={movie.poster_path}
      />
      <AnimatePresence>
        {isShowingDetail && (
          <MovieSearchItemDetail
            collectionId={collectionId}
            title={movie.title}
            picPath={movie.poster_path}
            releaseYear={
              movie.release_date ? movie.release_date.slice(0, 4) : 0
            }
            tmdbId={movie.id}
            summary={movie.overview}
            toggle={toggle}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default MovieSearchListItem;
