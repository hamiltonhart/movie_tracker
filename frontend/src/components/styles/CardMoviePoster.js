import styled from "styled-components";

export const CardMoviePoster = styled.img`
  height: var(--cardHeight);
  border-top-left-radius: var(--cardBorderRadius);
  border-bottom-left-radius: ${(props) =>
    props.squared ? 0 : `var(--cardBorderRadius)`};
`;
