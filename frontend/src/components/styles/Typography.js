import styled from "styled-components";

export const SiteHeading = styled.p`
  color: var(--primaryContrast);
  font-size: var(--big);
`;

export const SimplePStyle = styled.p`
  text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : `var(--normal)`)};
  padding: ${(props) => (props.padding ? props.padding : `var(--xsSpacing)`)};
`;

export const PageHeadingStyle = styled.h1`
  font-size: var(--mediumBig);
  font-weight: 800;
  padding: var(--medSpacing);
  color: var(--primary);
  text-align: center;
`;

export const LinkHeadingStyle = styled.a`
  font-size: var(--medium);
  padding: var(--xlSpacing);
  border-bottom: 2px solid var(--gray);
  color: var(--primary);
  font-weight: 600;
  &:visited {
    color: var(--primary);
  }
`;

export const CardHeadingStyle = styled.h3`
  display: inline;
  font-size: var(--bitMore);
  padding-bottom: var(--xsSpacing);
`;

export const CardMovieDateStyle = styled.p`
  display: inline;
  color: var(--darkGray);
  font-size: var(--normal);
`;

export const CardMovieSummaryStyle = styled.p`
  font-size: var(--sm);
  overflow-y: hidden;
  margin: var(--medSpacing);
`;

export const CardSectionHeadingStyle = styled.h4`
  font-size: var(--normal);
  font-weight: 600px;
`;
