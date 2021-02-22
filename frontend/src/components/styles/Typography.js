import styled from "styled-components";

export const SimplePStyle = styled.p`
  text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : `1.6rem`)};
  padding: ${(props) => (props.padding ? props.padding : ".8rem .8rem")};
`;

export const CardHeadingStyle = styled.h3`
  display: inline;
  font-size: 1.8rem;
  padding-bottom: 0.4rem;
`;

export const CardMovieDateStyle = styled.p`
  display: inline;
  color: var(--gray);
  font-size: 1.6rem;
`;

export const CardMovieSummaryStyle = styled.p`
  font-size: 1.2rem;
  overflow-y: hidden;
  margin: 1.6rem;
`;
