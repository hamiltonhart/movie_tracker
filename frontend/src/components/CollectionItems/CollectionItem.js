import React from "react";

import { MoviePosterStyle } from "../styles/CardMoviePoster";
import { MoviePosterContainer } from "../styles/Containers";

import imageNotAvailable from "../../images/NoImageAvailable.svg";
import { useToggle } from "../utilities";
import { PosterHeadingStyle } from "../styles/Typography";
import { CollectionItemDetail } from "./CollectionItemDetail";
import { AnimatePresence } from "framer-motion";

export const CollectionItem = ({ item, collectionId }) => {
  const POSTER_PATH = "http://image.tmdb.org/t/p/w154";

  // Used to hode the component after Deletion. Used because the Item list isn't rerendering on the cache update
  const { isShowing: isShowingVisible, toggle: toggleVisible } = useToggle(
    true
  );
  // Used to toggle the expanded card which shows more information. The poster art changes from rounded to squared when expanded
  const { isShowing: isShowingExpanded, toggle: toggleExpanded } = useToggle();

  return (
    // Confirms the item should be visible and is not deleted
    isShowingVisible && (
      <>
        <MoviePosterContainer role="button" onClick={toggleExpanded}>
          <MoviePosterStyle
            src={
              item.movie.picPath
                ? `${POSTER_PATH}${item.movie.picPath}`
                : imageNotAvailable
            }
            alt={item.movie.title}
          />

          <div>
            <PosterHeadingStyle>
              {item.movie.titlePrefix
                ? `${item.movie.titlePrefix} ${item.movie.title}`
                : `${item.movie.title}`}{" "}
            </PosterHeadingStyle>
            {/* <CardMovieDateStyle className="movieDate">{`(${item.movie.releaseYear})`}</CardMovieDateStyle> */}
          </div>
        </MoviePosterContainer>
        <AnimatePresence>
          {isShowingExpanded && (
            <CollectionItemDetail
              item={item}
              collectionId={collectionId}
              toggle={toggleExpanded}
            />
          )}
        </AnimatePresence>
      </>
    )
  );
};
