import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  CREATE_COLLECTION,
  MOVIE_COLLECTIONS,
} from "../../gql/MovieCollectionGQL";
import { Error } from "../Global";

import { NoBorderButton, PrimaryButton } from "../styles/Buttons";
import { FormStyle, TextInputStyle } from "../styles/Forms";
import { FlexContainer } from "../styles/Containers";

export const CreateMovieCollection = ({ toggle }) => {
  const [title, setTitle] = useState("");

  const [createMovieCollection, { error }] = useMutation(CREATE_COLLECTION);

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovieCollection({
      variables: { title },
      refetchQueries: [{ query: MOVIE_COLLECTIONS }],
      onCompleted: handleCompleted(),
    });
  };

  const handleCompleted = () => {
    setTitle("");
    toggle();
  };

  return (
    <FormStyle onSubmit={(e) => handleSubmit(e)}>
      <TextInputStyle
        fullwidth
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <FlexContainer justifyContent="space-around">
        <NoBorderButton onClick={toggle} fullwidth>
          Cancel
        </NoBorderButton>
        <PrimaryButton as="input" type="submit" fullwidth>
          Create
        </PrimaryButton>
        {error && <Error message={error.message} />}
      </FlexContainer>
    </FormStyle>
  );
};
