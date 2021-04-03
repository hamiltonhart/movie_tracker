import React, { useContext } from "react";

import { GET_COLLECTION_ITEM } from "../../gql/CollectionItemGQL";
import { DeleteCollectionItem } from "./DeleteCollectionItem";
import { CollectionContext } from "../../pages/CollectionPage";

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
import { Modal } from "../Global/Modal";
import { CloseButton } from "../Global/CloseButton";
import { useQuery } from "@apollo/react-hooks";
import { Error, Loading } from "../Global";
import { CollectionItemComments } from "./CollectionItemComments";

import { useToggle } from "../utilities/useToggle";
import { AnimatePresence, motion } from "framer-motion";

export const CollectionItemDetail = ({
  itemId,
  toggleDetail,
  rerenderList,
}) => {
  const context = useContext(CollectionContext);
  const POSTER_PATH = "http://image.tmdb.org/t/p/w154";
  const TMDB_PATH = "https://www.themoviedb.org/movie/";

  const {
    toggle: toggleAddComments,
    isShowing: isShowingAddComments,
  } = useToggle();

  const { data, loading, error } = useQuery(GET_COLLECTION_ITEM, {
    variables: { id: itemId },
  });

  const variants = {
    closed: {
      height: 0,
      opacity: 0,
    },
    open: {
      height: "auto",
      opacity: 1,
    },
  };

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
              <p
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  backgroundColor: "yellow",
                  padding: "5px",
                  borderBottomRightRadius: "var(--cardBorderRadius)",
                }}
              >
                {data.collectionItem.views}
              </p>
              <CardMovieInfoContainerStyle>
                <div>
                  <CardHeadingStyle>
                    {data.collectionItem.movie.titlePrefix
                      ? `${data.collectionItem.movie.titlePrefix} ${data.collectionItem.movie.title}`
                      : `${data.collectionItem.movie.title}`}{" "}
                  </CardHeadingStyle>
                  <CardMovieDateStyle className="movieDate">{`(${data.collectionItem.movie.releaseYear})`}</CardMovieDateStyle>
                </div>
                <CloseButton toggleDetail={toggleDetail} />
              </CardMovieInfoContainerStyle>
            </CardMovieContentContainerStyle>

            <CardMoreInfoContainerStyle>
              <FlexContainer flexDirection="column">
                <CardSectionHeadingStyle>Summary</CardSectionHeadingStyle>
                <CardMovieSummaryStyle>
                  {data.collectionItem.movie.summary}
                </CardMovieSummaryStyle>
              </FlexContainer>
              <FlexContainer flexDirection="column" topBorder>
                <CollectionItemComments
                  collectionItemId={data.collectionItem.id}
                  comments={data.collectionItem.comments}
                  toggleAddComments={toggleAddComments}
                  isShowingAddComments={isShowingAddComments}
                />
              </FlexContainer>
              <AnimatePresence>
                {!isShowingAddComments && (
                  <motion.div
                    variants={variants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <DeleteCollectionItem
                      id={data.collectionItem.id}
                      collectionId={context.collection.id}
                      rerenderList={rerenderList}
                      toggleDetail={toggleDetail}
                    />
                    <SecondaryButton
                      as="a"
                      href={`${TMDB_PATH}${data.collectionItem.movie.tmdbId}`}
                      target="_blank"
                    >
                      See on TMDb
                    </SecondaryButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardMoreInfoContainerStyle>
          </>
        )}
      </CardStyle>
    </Modal>
  );
};
