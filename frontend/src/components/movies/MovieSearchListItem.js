import React from "react";
import { CreateCollectionItem } from "../CollectionItems";

import { NoBorderButton, SecondaryButton } from "../styles/Buttons";
import {
  CardMoreInfoContainerStyle,
  CardMovieContentContainerStyle,
  CardMovieInfoContainerStyle,
  CardStyle,
  PrimaryCardButtonContainerStyle,
} from "../styles/Containers";
import { CardMoviePoster } from "../styles/CardMoviePoster";
import {
  CardHeadingStyle,
  CardMovieDateStyle,
  CardMovieSummaryStyle,
} from "../styles/Typography";
import { useToggle } from "../utilities";

const MovieSearchListItem = ({ collectionId, movie, toggle }) => {
  const POSTER_PATH = "http://image.tmdb.org/t/p/w154";
  const TMDB_PATH = "https://www.themoviedb.org/movie/";

  const { toggle: toggleMoreInfo, isShowing: isShowingMoreInfo } = useToggle();

  return (
    <CardStyle expanded={isShowingMoreInfo}>
      <CardMovieContentContainerStyle>
        <CardMoviePoster
          src={`${POSTER_PATH}${movie.poster_path}`}
          alt={movie.title}
          squared={isShowingMoreInfo}
          onClick={toggleMoreInfo}
        />
        <CardMovieInfoContainerStyle>
          <div>
            <CardHeadingStyle>{`${movie.title}`} </CardHeadingStyle>
            <CardMovieDateStyle>
              {movie.release_date && `(${movie.release_date.slice(0, 4)})`}
            </CardMovieDateStyle>
          </div>
          <PrimaryCardButtonContainerStyle>
            <CreateCollectionItem
              movieCollectionId={collectionId}
              title={movie.title}
              tmdbId={movie.id}
              summary={movie.overview}
              picPath={movie.poster_path}
              releaseYear={
                movie.release_date ? movie.release_date.slice(0, 4) : 0
              }
              toggle={toggle}
            />
          </PrimaryCardButtonContainerStyle>
        </CardMovieInfoContainerStyle>
      </CardMovieContentContainerStyle>
      {isShowingMoreInfo && (
        <CardMoreInfoContainerStyle>
          <CardMovieSummaryStyle>{`${movie.overview}`}</CardMovieSummaryStyle>
          <div>
            <NoBorderButton
              as="a"
              href={`${TMDB_PATH}${movie.id}`}
              target="_blank"
              fullwidth
            >
              See on TMDb
            </NoBorderButton>
          </div>
        </CardMoreInfoContainerStyle>
      )}
    </CardStyle>
  );
};

export default MovieSearchListItem;
