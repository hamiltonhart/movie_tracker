import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { AnimatePresence } from "framer-motion";
import { FormStyle, LabelStyle, TextareaInputStyle } from "../styles/Forms";
import { UPDATE_COLLECTION_ITEM } from "../../gql/CollectionItemGQL";
import { FlexContainer } from "../styles/Containers";
import { NoBorderButton, PrimaryButton } from "../styles/Buttons";
import { Error } from "../Global";

export const UpdateCollectionItem = ({
  id,
  currentComments,
  toggle,
  isShowing,
}) => {
  const [comments, setComments] = useState(currentComments || "");

  const [updateCollectionItem, { loading, error }] = useMutation(
    UPDATE_COLLECTION_ITEM
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCollectionItem({ variables: { id, comments } });
    toggle();
  };

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
        {isShowing && (
          <FormStyle
            variants={variants}
            initial="closed"
            animate="open"
            exit="closed"
            transition="transition"
            onSubmit={(e) => handleSubmit(e)}
            marginTop="--var(xsSpacing)"
            overflow="hidden"
          >
            {error && <Error error={error.message} />}
            <LabelStyle htmlFor={`${id}-comments`} hidden>
              Comments
            </LabelStyle>
            <TextareaInputStyle
              id={`${id}-comments`}
              value={comments}
              rows="5"
              autoFocus
              onChange={(e) => setComments(e.target.value)}
            />
            <FlexContainer>
              <NoBorderButton onClick={toggle}>Cancel</NoBorderButton>
              <PrimaryButton
                as="input"
                type="submit"
                value={!!comments ? "Update Comments" : "Add Comments"}
                disabled={loading}
              />
            </FlexContainer>
          </FormStyle>
        )}
      </AnimatePresence>
      {!isShowing && (
        <PrimaryButton onClick={toggle} disabled={isShowing}>
          {currentComments ? "Edit Comments" : "Add Comments"}
        </PrimaryButton>
      )}
    </>
  );
};
