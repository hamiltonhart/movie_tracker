import React from "react";

import { FlexContainer } from "../components/styles/Containers";
import { Link } from "@reach/router";
import { NoBorderButton } from "../components/styles/Buttons";

export const HomePage = () => {
  return (
    <FlexContainer flexDirection="column">
      <NoBorderButton as={Link} to="collections/">
        Go To Movies
      </NoBorderButton>
      <NoBorderButton as={Link} to="plants/">
        Go To Plants
      </NoBorderButton>
    </FlexContainer>
  );
};
