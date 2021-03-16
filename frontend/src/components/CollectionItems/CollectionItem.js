import React from "react";

import { DeleteCollectionItem } from "./DeleteCollectionItem";

import { CardMoviePoster } from "../styles/CardMoviePoster";
import {
  CardMovieContentContainerStyle,
  CardMovieInfoContainerStyle,
  FlexContainer,
  PrimaryCardButtonContainerStyle,
} from "../styles/Containers";
import { SecondaryButton } from "../styles/Buttons";
import imageNotAvailable from "../../images/NoImageAvailable.svg";
import { useToggle } from "../utilities";
import {
  CardHeadingStyle,
  CardMovieDateStyle,
  CardMovieSummaryStyle,
  CardSectionHeadingStyle,
} from "../styles/Typography";
import { CardStyle, CardMoreInfoContainerStyle } from "../styles/Containers";
import { UpdateCollectionItem } from "./UpdateCollectionItem";

export const CollectionItem = ({ item, collectionId }) => {
  const POSTER_PATH = "http://image.tmdb.org/t/p/w154";
  const TMDB_PATH = "https://www.themoviedb.org/movie/";

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
        {console.log(item)}
        <CardStyle expanded={isShowingExpanded}>
          <CardMovieContentContainerStyle>
            <CardMoviePoster
              src={
                item.movie.picPath
                  ? `${POSTER_PATH}${item.movie.picPath}`
                  : imageNotAvailable
              }
              alt={item.movie.title}
              squared={isShowingExpanded}
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
                {/* Toggles the expanded view */}
                <SecondaryButton onClick={toggleExpanded}>
                  {isShowingExpanded ? `Show Less` : `Show More`}
                </SecondaryButton>
              </PrimaryCardButtonContainerStyle>
            </CardMovieInfoContainerStyle>
          </CardMovieContentContainerStyle>
          {/* Shows when expanded */}
          {isShowingExpanded && (
            <CardMoreInfoContainerStyle>
              <CardMovieSummaryStyle>
                {item.movie.summary}
              </CardMovieSummaryStyle>
              {item.comments && (
                <>
                  <CardSectionHeadingStyle>Comments</CardSectionHeadingStyle>
                  <CardMovieSummaryStyle>{item.comments}</CardMovieSummaryStyle>
                </>
              )}
              <FlexContainer flexDirection="column">
                <UpdateCollectionItem
                  id={item.id}
                  currentComments={item.comments}
                />
              </FlexContainer>
              <div>
                <DeleteCollectionItem
                  id={item.id}
                  collectionId={collectionId}
                  toggle={toggleVisible}
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
      </>
    )
  );
};
