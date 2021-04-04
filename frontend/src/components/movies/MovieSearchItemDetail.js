import React from "react";

import { CardMoviePoster } from "../styles/CardMoviePoster";
import {
  CardButtonBottomStyle,
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
import { NoBorderButton } from "../styles/Buttons";

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
            <FlexContainer flexDirection="column" marginBottom>
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

            <CardButtonBottomStyle>
              <NoBorderButton
                as="a"
                href={`${TMDB_PATH}${tmdbId}`}
                target="_blank"
                style={{ gridColumn: "span 3" }}
              >
                See on TMDb
              </NoBorderButton>
            </CardButtonBottomStyle>
          </CardMoreInfoContainerStyle>
        </>
      </CardStyle>
    </Modal>
  );
};
