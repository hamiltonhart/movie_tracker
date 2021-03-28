import { AnimatePresence } from "framer-motion";
import React from "react";
import { FlexContainer } from "../styles/Containers";
import {
  CardMovieSummaryStyle,
  CardSectionHeadingStyle,
} from "../styles/Typography";

import { UpdateCollectionItem } from "./UpdateCollectionItem";

export const CollectionItemComments = ({
  collectionItemId,
  comments,
  toggleAddComments,
  isShowingAddComments,
}) => {
  const variants = {
    closed: {
      height: 0,
      opacity: 0,
    },
    open: {
      height: "auto",
      opacity: 1,
    },
    transition: {
      damping: 300,
    },
  };

  return (
    <>
      <AnimatePresence>
        {comments && !isShowingAddComments && (
          <FlexContainer
            variants={variants}
            initial="closed"
            animate="open"
            exit="closed"
            transition="transition"
            flexDirection="column"
            padding="0"
            overflow="hidden"
          >
            <CardSectionHeadingStyle>Comments</CardSectionHeadingStyle>
            <CardMovieSummaryStyle>{comments}</CardMovieSummaryStyle>
          </FlexContainer>
        )}
      </AnimatePresence>
      {
        <UpdateCollectionItem
          id={collectionItemId}
          currentComments={comments}
          toggle={toggleAddComments}
          isShowing={isShowingAddComments}
        />
      }
    </>
  );
};
