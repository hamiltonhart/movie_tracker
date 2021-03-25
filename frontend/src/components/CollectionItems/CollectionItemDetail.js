import React from "react";

import { GET_COLLECTION_ITEM } from "../../gql/CollectionItemGQL";
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
import { useQuery } from "@apollo/react-hooks";
import { Error, Loading } from "../Global";

export const CollectionItemDetail = ({
  item,
  collectionId,
  toggle,
  rerenderList,
}) => {
  const POSTER_PATH = "http://image.tmdb.org/t/p/w154";
  const TMDB_PATH = "https://www.themoviedb.org/movie/";

  const { data, loading, error } = useQuery(GET_COLLECTION_ITEM, {
    variables: { id: item.id },
  });

  return (
    <Modal>
      <CardStyle>
        {loading && <Loading />}
        {error && <Error message={error.message} />}
        {data && (
          <>
            <CardMovieContentContainerStyle>
              <CardMoviePoster
                src={
                  data.collectionItem.movie.picPath
                    ? `${POSTER_PATH}${data.collectionItem.movie.picPath}`
                    : imageNotAvailable
                }
                alt={data.collectionItem.movie.title}
              />
              <CardMovieInfoContainerStyle>
                <div>
                  <CardHeadingStyle>
                    {data.collectionItem.movie.titlePrefix
                      ? `${data.collectionItem.movie.titlePrefix} ${data.collectionItem.movie.title}`
                      : `${data.collectionItem.movie.title}`}{" "}
                  </CardHeadingStyle>
                  <CardMovieDateStyle className="movieDate">{`(${data.collectionItem.movie.releaseYear})`}</CardMovieDateStyle>
                </div>
                <CloseButton onClick={toggle} />
              </CardMovieInfoContainerStyle>
            </CardMovieContentContainerStyle>

            <CardMoreInfoContainerStyle>
              <FlexContainer flexDirection="column">
                <CardSectionHeadingStyle>Summary</CardSectionHeadingStyle>
                <CardMovieSummaryStyle>
                  {data.collectionItem.movie.summary}
                </CardMovieSummaryStyle>
              </FlexContainer>
              {data.collectionItem.comments && (
                <FlexContainer flexDirection="column" topBorder>
                  <CardSectionHeadingStyle>Comments</CardSectionHeadingStyle>
                  <CardMovieSummaryStyle>
                    {data.collectionItem.comments}
                  </CardMovieSummaryStyle>
                </FlexContainer>
              )}
              <FlexContainer flexDirection="column">
                <UpdateCollectionItem
                  id={data.collectionItem.id}
                  currentComments={data.collectionItem.comments}
                />
              </FlexContainer>
              <div>
                <DeleteCollectionItem
                  id={data.collectionItem.id}
                  collectionId={collectionId}
                  rerenderList={rerenderList}
                />
                <SecondaryButton
                  as="a"
                  href={`${TMDB_PATH}${data.collectionItem.movie.tmdbId}`}
                  target="_blank"
                >
                  See on TMDb
                </SecondaryButton>
              </div>
            </CardMoreInfoContainerStyle>
          </>
        )}
      </CardStyle>
    </Modal>
  );
};
