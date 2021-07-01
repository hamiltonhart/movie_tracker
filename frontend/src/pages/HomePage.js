import React from "react";
import {
  CollectionList,
  CreateMovieCollection,
} from "../components/MovieCollections";

import { useToggle } from "../components/utilities";

import { SecondaryButton } from "../components/styles/Buttons";
import { FlexContainer } from "../components/styles/Containers";
import { Link } from "@reach/router";

export const HomePage = () => {
  const { isShowing, toggle } = useToggle();

  return (
    <FlexContainer flexDirection="column">
      {!isShowing ? (
        <SecondaryButton onClick={toggle}>Start A New List</SecondaryButton>
      ) : (
        <CreateMovieCollection toggle={toggle} />
      )}
      <CollectionList />
      <Link to="plants/">See Plants</Link>
    </FlexContainer>
  );
};
