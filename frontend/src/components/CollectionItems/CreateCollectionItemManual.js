import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { CREATE_COLLECTION_ITEM, MOVIE_COLLECTION } from "../../gql";
import { Error } from "../Global";

import { NoBorderButton, SecondaryButton } from "../styles/Buttons";
import {
  FormStyle,
  LabelStyle,
  TextareaInputStyle,
  TextInputStyle,
} from "../styles/Forms";
import { FlexContainer } from "../styles/Containers";
import { SimplePStyle } from "../styles/Typography";

export const CreateCollectionItemManual = ({ movieCollectionId, toggle }) => {
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [summary, setSummary] = useState("");

  // Handles updating the Apollo cache for the Movie Collection Mutation. Also present in CreateCollectionItem.
  const handleUpdateCache = (cache, { data }) => {
    const fullQuery = cache.readQuery({
      query: MOVIE_COLLECTION,
      variables: { id: movieCollectionId },
    });
    let items = fullQuery.movieCollection;
    const newItem = data.createCollectionItem.collectionItem;

    items.movies = items.movies.concat(newItem);

    cache.writeQuery({
      query: MOVIE_COLLECTION,
      variables: { id: movieCollectionId },
      data: { movieCollection: items },
    });

    handleCompleted();
  };

  const [createCollectionItem, { error }] = useMutation(
    CREATE_COLLECTION_ITEM,
    { update: handleUpdateCache }
  );

  // Calls the createCollectionItem mutation
  const handleSubmit = (e) => {
    e.preventDefault();
    createCollectionItem({
      variables: {
        movieCollectionId,
        title,
        summary,
        releaseYear: releaseYear ? releaseYear : 0,
      },
    });
  };

  // Toggles the create component off and shows the CollectionItemList AFTER the update function
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
        <LabelStyle htmlFor="newMovieTitle" hidden>
          Title
        </LabelStyle>
        <TextInputStyle
          type="text"
          id="newMovieTitle"
          placeholder="Title (Required)"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <LabelStyle htmlFor="releaseYear" hidden>
          Release Year
        </LabelStyle>
        <TextInputStyle
          type="text"
          id="releaseYear"
          placeholder="Release Year (Required, 4 Digits)"
          fullwidth
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
        />
        <LabelStyle htmlFor="movieSummary" hidden>
          Summary
        </LabelStyle>
        <TextareaInputStyle
          id="movieSummary"
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
