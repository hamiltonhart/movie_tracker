import React from "react";
import {
  CollectionList,
  CreateMovieCollection,
} from "../components/MovieCollections";

import { useToggle } from "../components/utilities";

import { SecondaryButton } from "../components/styles/Buttons";
import { FlexContainer } from "../components/styles/Containers";
import { PageHeadingStyle } from "../components/styles/Typography";

export const MoviesPage = () => {
  const { isShowing, toggle } = useToggle();

  return (
    <FlexContainer flexDirection="column">
      <PageHeadingStyle marginBottom>Show Me The Movies!</PageHeadingStyle>
      {!isShowing ? (
        <SecondaryButton onClick={toggle}>Start A New List</SecondaryButton>
      ) : (
        <CreateMovieCollection toggle={toggle} />
      )}
      <CollectionList />
    </FlexContainer>
  );
};
