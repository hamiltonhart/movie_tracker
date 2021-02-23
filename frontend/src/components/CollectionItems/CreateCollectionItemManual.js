import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { CREATE_COLLECTION_ITEM, MOVIE_COLLECTION } from "../../gql";
import { Error } from "../Global";

import { NoBorderButton, SecondaryButton } from "../styles/Buttons";
import { FormStyle, TextareaInputStyle, TextInputStyle } from "../styles/Forms";
import { FlexContainer } from "../styles/Containers";
import { SimplePStyle } from "../styles/Typography";

export const CreateCollectionItemManual = ({ movieCollectionId, toggle }) => {
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [summary, setSummary] = useState("");

  const [createCollectionItem, { error }] = useMutation(CREATE_COLLECTION_ITEM);
  const handleSubmit = (e) => {
    e.preventDefault();
    createCollectionItem({
      variables: {
        movieCollectionId,
        title,
        summary,
        releaseYear: releaseYear ? releaseYear : 0,
      },
      refetchQueries: [
        { query: MOVIE_COLLECTION, variables: { id: movieCollectionId } },
      ],
      onCompleted: handleCompleted(),
    });
  };

  const handleCompleted = () => {
    toggle();
  };

  return (
    <FlexContainer flexDirection="column" topBorder>
      <SimplePStyle textAlign="center" fontSize="2rem">
        Can't find what you're looking for?
      </SimplePStyle>
      <SimplePStyle textAlign="center" fontSize="2rem">
        Add it here!
      </SimplePStyle>
      <FormStyle onSubmit={(e) => handleSubmit(e)}>
        <TextInputStyle
          placeholder="Title (Required)"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextInputStyle
          placeholder="Release Year (Required, 4 Digits)"
          fullwidth
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
        />
        <TextareaInputStyle
          placeholder="Summary (Required)"
          rows="5"
          variant="outlined"
          fullwidth
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />

        <SecondaryButton
          type="submit"
          disabled={
            !title ||
            !releaseYear ||
            releaseYear.length !== 4 ||
            isNaN(releaseYear) ||
            !summary
          }
          fullwidth
        >
          Add
        </SecondaryButton>
        <NoBorderButton fullwidth onClick={toggle}>
          Cancel
        </NoBorderButton>
      </FormStyle>
      {error && <Error message={error.message} />}
    </FlexContainer>
  );
};
