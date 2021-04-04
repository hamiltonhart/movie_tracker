import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_COLLECTION } from "../../gql/MovieCollectionGQL";
import { CollectionContext } from "../../pages/CollectionPage";
import { Error } from "../Global";

import { NoBorderButton, PrimaryButton } from "../styles/Buttons";
import { FormStyle, LabelStyle, TextInputStyle } from "../styles/Forms";
import { FlexContainer } from "../styles/Containers";
import { DeleteCollection } from "./DeleteCollection";

export const UpdateMovieCollection = () => {
  const context = useContext(CollectionContext);

  const [title, setTitle] = useState(context.collection.title);

  const [updateMovieCollection, { error }] = useMutation(UPDATE_COLLECTION);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMovieCollection({
      variables: { id: context.collection.id, title },
      onCompleted: handleCompleted(),
    });
  };

  // The interface for the CollectionList editor is unmounted
  const handleCompleted = () => {
    context.toggleEdit();
  };

  const handleCancel = () => {
    context.toggleEdit();
  };

  return (
    <>
      <FormStyle onSubmit={(e) => handleSubmit(e)}>
        <LabelStyle htmlFor="updateCollectionName" hidden>
          CollectionName
        </LabelStyle>
        <TextInputStyle
          type="text"
          id="updateCollectionName"
          fullwidth
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <PrimaryButton
          as="input"
          type="submit"
          size="large"
          fullwidth
          value="Update"
        />
        <FlexContainer>
          <DeleteCollection fullwidth>Delete</DeleteCollection>

          <NoBorderButton fullwidth onClick={handleCancel}>
            Cancel
          </NoBorderButton>
        </FlexContainer>
        {error && <Error message={error.message} />}
      </FormStyle>
    </>
  );
};
