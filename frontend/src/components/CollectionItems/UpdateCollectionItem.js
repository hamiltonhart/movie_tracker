import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { FormStyle, LabelStyle, TextareaInputStyle } from "../styles/Forms";
import { UPDATE_COLLECTION_ITEM } from "../../gql/CollectionItemGQL";
import { FlexContainer } from "../styles/Containers";
import { NoBorderButton, PrimaryButton } from "../styles/Buttons";
import { Error } from "../Global";
import { Modal } from "../Global/Modal";

export const UpdateCollectionItem = ({ id, currentComments }) => {
  const [isShowing, setIsShowing] = useState(false);
  const [comments, setComments] = useState(currentComments || "");

  const [updateCollectionItem, { loading, error }] = useMutation(
    UPDATE_COLLECTION_ITEM
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCollectionItem({ variables: { id, comments } });
    setIsShowing(false);
  };

  return (
    <>
      <PrimaryButton onClick={() => setIsShowing(true)} disabled={isShowing}>
        {currentComments ? "Edit Comments" : "Add Comments"}
      </PrimaryButton>
      {isShowing && (
        <Modal>
          <FlexContainer backgroundColor="var(--white)">
            <FormStyle onSubmit={(e) => handleSubmit(e)}>
              {error && <Error error={error.message} />}
              <LabelStyle htmlFor={`${id}-comments`}>Comments</LabelStyle>
              <TextareaInputStyle
                id={`${id}-comments`}
                value={comments}
                rows="5"
                onChange={(e) => setComments(e.target.value)}
              />
              <FlexContainer>
                <NoBorderButton onClick={() => setIsShowing(false)}>
                  Cancel
                </NoBorderButton>
                <PrimaryButton
                  as="input"
                  type="submit"
                  value="Update"
                  disabled={loading}
                />
              </FlexContainer>
            </FormStyle>
          </FlexContainer>
        </Modal>
      )}
    </>
  );
};
