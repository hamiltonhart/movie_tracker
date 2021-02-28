import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  UPDATE_COLLECTION,
  MOVIE_COLLECTION,
} from "../../gql/MovieCollectionGQL";
import { Error } from "../Global";

import { NoBorderButton, PrimaryButton } from "../styles/Buttons";
import { FormStyle, LabelStyle, TextInputStyle } from "../styles/Forms";
import { FlexContainer } from "../styles/Containers";
import { DeleteCollection } from "./DeleteCollection";

export const UpdateMovieCollection = ({ toggle, id, collectionTitle }) => {
  const [title, setTitle] = useState(collectionTitle);

  const [updateMovieCollection, { error }] = useMutation(UPDATE_COLLECTION);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMovieCollection({
      variables: { id, title },
      refetchQueries: [{ query: MOVIE_COLLECTION, variables: { id: id } }],
      onCompleted: handleCompleted(),
    });
  };

  const handleCompleted = () => {
    setTitle(title);
    toggle();
  };

  const handleCancel = () => {
    setTitle(collectionTitle);
    toggle();
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
          <DeleteCollection fullwidth id={id}>
            Delete
          </DeleteCollection>

          <NoBorderButton fullwidth onClick={handleCancel}>
            Cancel
          </NoBorderButton>
        </FlexContainer>
        {error && <Error message={error.message} />}
      </FormStyle>
    </>
  );
};
