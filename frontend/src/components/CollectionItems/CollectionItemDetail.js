import React from "react";

import { DeleteCollectionItem } from "./DeleteCollectionItem";

import { CardMoviePoster } from "../styles/CardMoviePoster";
import {
  CardMovieContentContainerStyle,
  CardMovieInfoContainerStyle,
  FlexContainer,
} from "../styles/Containers";
import { SecondaryButton } from "../styles/Buttons";
import imageNotAvailable from "../../images/NoImageAvailable.svg";
import {
  CardHeadingStyle,
  CardMovieDateStyle,
  CardMovieSummaryStyle,
  CardSectionHeadingStyle,
} from "../styles/Typography";
import { CardStyle, CardMoreInfoContainerStyle } from "../styles/Containers";
import { UpdateCollectionItem } from "./UpdateCollectionItem";
import { Modal } from "../Global/Modal";
import { CloseButton } from "../Global/CloseButton";

export const CollectionItemDetail = ({ item, collectionId, toggle }) => {
  const POSTER_PATH = "http://image.tmdb.org/t/p/w154";
  const TMDB_PATH = "https://www.themoviedb.org/movie/";

  return (
    // Confirms the item should be visible and is not deleted
    <Modal>
      <CardStyle>
        <CardMovieContentContainerStyle>
          <CardMoviePoster
            src={
              item.movie.picPath
                ? `${POSTER_PATH}${item.movie.picPath}`
                : imageNotAvailable
            }
            alt={item.movie.title}
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
            <CloseButton onClick={toggle} />
          </CardMovieInfoContainerStyle>
        </CardMovieContentContainerStyle>
        {/* Shows when expanded */}

        <CardMoreInfoContainerStyle>
          <FlexContainer flexDirection="column">
            <CardSectionHeadingStyle>Summary</CardSectionHeadingStyle>
            <CardMovieSummaryStyle>{item.movie.summary}</CardMovieSummaryStyle>
          </FlexContainer>
          {item.comments && (
            <FlexContainer flexDirection="column" topBorder>
              <CardSectionHeadingStyle>Comments</CardSectionHeadingStyle>
              <CardMovieSummaryStyle>{item.comments}</CardMovieSummaryStyle>
            </FlexContainer>
          )}
          <FlexContainer flexDirection="column">
            <UpdateCollectionItem
              id={item.id}
              currentComments={item.comments}
            />
          </FlexContainer>
          <div>
            <DeleteCollectionItem id={item.id} collectionId={collectionId} />
            <SecondaryButton
              as="a"
              href={`${TMDB_PATH}${item.movie.tmdbId}`}
              target="_blank"
            >
              See on TMDb
            </SecondaryButton>
          </div>
        </CardMoreInfoContainerStyle>
      </CardStyle>
    </Modal>
  );
};
