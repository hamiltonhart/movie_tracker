import React from "react";

import { CardMoviePoster } from "../styles/CardMoviePoster";
import {
  CardMovieContentContainerStyle,
  CardMovieInfoContainerStyle,
  FlexContainer,
} from "../styles/Containers";

import imageNotAvailable from "../../images/NoImageAvailable.svg";
import {
  CardHeadingStyle,
  CardMovieDateStyle,
  CardMovieSummaryStyle,
  CardSectionHeadingStyle,
} from "../styles/Typography";
import { CardStyle, CardMoreInfoContainerStyle } from "../styles/Containers";

import { Modal } from "../Global/Modal";
import { CloseButton } from "../Global/CloseButton";
import { CreateCollectionItem } from "../CollectionItems";
import { SecondaryButton } from "../styles/Buttons";

export const MovieSearchItemDetail = ({
  collectionId,
  title,
  picPath,
  releaseYear,
  tmdbId,
  summary,
  toggle,
}) => {
  const POSTER_PATH = "http://image.tmdb.org/t/p/w154";
  const TMDB_PATH = "https://www.themoviedb.org/movie/";

  return (
    <Modal>
      <CardStyle>
        <>
          <CardMovieContentContainerStyle>
            <CardMoviePoster
              src={picPath ? `${POSTER_PATH}${picPath}` : imageNotAvailable}
              alt={title}
            />
            <CardMovieInfoContainerStyle>
              <div>
                <CardHeadingStyle>{title} </CardHeadingStyle>
                <CardMovieDateStyle className="movieDate">
                  {releaseYear}
                </CardMovieDateStyle>
              </div>
              <CloseButton toggleDetail={toggle} />
            </CardMovieInfoContainerStyle>
          </CardMovieContentContainerStyle>

          <CardMoreInfoContainerStyle>
            <FlexContainer flexDirection="column">
              <CreateCollectionItem
                movieCollectionId={collectionId}
                title={title}
                tmdbId={tmdbId}
                summary={summary}
                picPath={picPath}
                releaseYear={releaseYear}
                toggle={toggle}
              />
              <CardSectionHeadingStyle>Summary</CardSectionHeadingStyle>
              <CardMovieSummaryStyle>{summary}</CardMovieSummaryStyle>
            </FlexContainer>

            <div>
              <SecondaryButton
                as="a"
                href={`${TMDB_PATH}${tmdbId}`}
                target="_blank"
              >
                See on TMDb
              </SecondaryButton>
            </div>
          </CardMoreInfoContainerStyle>
        </>
      </CardStyle>
    </Modal>
  );
};
