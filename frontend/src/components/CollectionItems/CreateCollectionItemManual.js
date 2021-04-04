import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";

import { CollectionContext } from "../../pages/CollectionPage";
import {
  CREATE_COLLECTION_ITEM,
  MOVIE_COLLECTION_AND_ITEMS,
  UPDATE_COLLECTION_ITEM,
} from "../../gql";
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
import { findMatch } from "./utilities/findMatch";
import { movieSortingABC } from "../../utilities";

export const CreateCollectionItemManual = ({ movieCollectionId }) => {
  const context = useContext(CollectionContext);

  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [summary, setSummary] = useState("");

  // Toggles the create component off and shows the CollectionItemList AFTER the update function
  const handleCompleted = () => {
    context.toggleAdd();
  };

  // Handles updating the Apollo cache for the Movie Collection Mutation. Also present in CreateCollectionItem.
  const handleUpdateCache = (cache, { data }) => {
    const fullQuery = cache.readQuery({
      query: MOVIE_COLLECTION_AND_ITEMS,
      variables: { id: movieCollectionId, collectionId: movieCollectionId },
    });

    const movieCollection = fullQuery.movieCollection;
    let collectionItems = fullQuery.collectionItems;
    const newItem = data.createCollectionItem.collectionItem;

    collectionItems = collectionItems.concat(newItem);
    collectionItems = movieSortingABC(collectionItems);

    cache.writeQuery({
      query: MOVIE_COLLECTION_AND_ITEMS,
      variables: { id: movieCollectionId, collectionId: movieCollectionId },
      data: { movieCollection, collectionItems },
    });
  };

  const [createCollectionItem, { error }] = useMutation(
    CREATE_COLLECTION_ITEM,
    { update: handleUpdateCache, onCompleted: handleCompleted }
  );

  const [
    updateCollectionItem,
    { error: updateError },
  ] = useMutation(UPDATE_COLLECTION_ITEM, { onCompleted: handleCompleted });

  // Calls the createCollectionItem mutation
  const handleSubmit = (e) => {
    e.preventDefault();
    const matchFound = findMatch({
      items: context.collectionItems,
      title,
      releaseYear,
    });
    if (matchFound) {
      updateCollectionItem({ variables: { id: matchFound, views: 1 } });
    } else {
      createCollectionItem({
        variables: {
          movieCollectionId,
          title,
          summary,
          releaseYear: releaseYear ? releaseYear : 0,
        },
      });
    }
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
        <NoBorderButton fullwidth onClick={context.toggleAdd}>
          Cancel
        </NoBorderButton>
      </FormStyle>
      {error && <Error message={error.message} />}
    </FlexContainer>
  );
};
