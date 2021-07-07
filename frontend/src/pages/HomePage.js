import React from "react";

import { FlexContainer } from "../components/styles/Containers";
import { Link } from "@reach/router";
import { OutlineButton } from "../components/styles/Buttons";
import {
  PageHeadingStyle,
  SectionHeadingStyle,
} from "../components/styles/Typography";

export const HomePage = () => {
  return (
    <FlexContainer flexDirection="column">
      <PageHeadingStyle>Brandi Movie Database</PageHeadingStyle>
      <SectionHeadingStyle
        centerText
        color="var(--darkGrey)"
        padding="0 0 var(--medSpacing) 0"
        fontSize="var(--medium)"
      >
        (And also plants...)
      </SectionHeadingStyle>
      <FlexContainer flexDirection="column">
        <OutlineButton
          raiseHover
          margin="var(--medSpacing)"
          as={Link}
          to="collections/"
        >
          Movies
        </OutlineButton>
        <OutlineButton
          raiseHover
          margin="var(--medSpacing)"
          as={Link}
          to="plants/"
        >
          Plants
        </OutlineButton>
      </FlexContainer>
    </FlexContainer>
  );
};
