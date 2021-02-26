import React from "react";

import { DeleteCollectionItem } from "./DeleteCollectionItem";

import { CardMoviePoster } from "../styles/CardMoviePoster";
import {
  CardMovieContentContainerStyle,
  CardMovieInfoContainerStyle,
  PrimaryCardButtonContainerStyle,
} from "../styles/Containers";
import { SecondaryButton } from "../styles/Buttons";
import imageNotAvailable from "../../images/NoImageAvailable.svg";
import { useToggle } from "../utilities";
import {
  CardHeadingStyle,
  CardMovieDateStyle,
  CardMovieSummaryStyle,
} from "../styles/Typography";
import { CardStyle, CardMoreInfoContainerStyle } from "../styles/Containers";

export const CollectionItem = ({ item, collectionId }) => {
  const POSTER_PATH = "http://image.tmdb.org/t/p/w154";
  const TMDB_PATH = "https://www.themoviedb.org/movie/";

  const { isShowing, toggle } = useToggle();

  return (
    <CardStyle expanded={isShowing}>
      <CardMovieContentContainerStyle>
        <CardMoviePoster
          src={
            item.movie.picPath
              ? `${POSTER_PATH}${item.movie.picPath}`
              : imageNotAvailable
          }
          alt={item.movie.title}
          squared={isShowing}
        />
        <CardMovieInfoContainerStyle>
          <div>
            <CardHeadingStyle>
              {item.movie.titlePrefix
                ? `${item.movie.titlePrefix} ${item.movie.title}`
                : `${item.movie.title}`}{" "}
            </CardHeadingStyle>
            <CardMovieDateStyle className="movieDate">{`(${item.movie.releaseYear})`}</CardMovieDateStyle>
          </div>
          <PrimaryCardButtonContainerStyle>
            <SecondaryButton onClick={toggle}>
              {isShowing ? `Show Less` : `Show More`}
            </SecondaryButton>
          </PrimaryCardButtonContainerStyle>
        </CardMovieInfoContainerStyle>
      </CardMovieContentContainerStyle>
      {isShowing && (
        <CardMoreInfoContainerStyle>
          <CardMovieSummaryStyle>{item.movie.summary}</CardMovieSummaryStyle>
          <div>
            <DeleteCollectionItem
              id={item.id}
              title={item.movie.title}
              collectionId={collectionId}
            />
            <SecondaryButton
              as="a"
              href={`${TMDB_PATH}${item.movie.tmdbId}`}
              target="_blank"
            >
              See on TMDb
            </SecondaryButton>
          </div>
        </CardMoreInfoContainerStyle>
      )}
    </CardStyle>
  );
};
