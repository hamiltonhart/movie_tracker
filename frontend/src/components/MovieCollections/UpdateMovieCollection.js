import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  UPDATE_COLLECTION,
  MOVIE_COLLECTION,
} from "../../gql/MovieCollectionGQL";
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
      refetchQueries: [
        { query: MOVIE_COLLECTION, variables: { id: context.collection.id } },
      ],
      onCompleted: handleCompleted(),
    });
  };

  const handleCompleted = () => {
    setTitle(title);
    context.toggleEdit();
  };

  const handleCancel = () => {
    setTitle(context.collection.title);
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
