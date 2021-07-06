import styled from "styled-components";

export const SiteHeading = styled.p`
  color: var(--primaryContrast);
  font-size: var(--big);
`;

export const SimplePStyle = styled.p`
  text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : `var(--normal)`)};
  padding: ${(props) => (props.padding ? props.padding : `var(--xsSpacing)`)};
  ${(props) => props.showBreaks && `white-space: pre-line;`}
`;

export const PageHeadingStyle = styled.h1`
  font-size: var(--big);
  font-weight: 800;
  padding: var(--medSpacing);
  color: var(--primary);
  text-align: center;
  ${(props) => props.marginBottom && `margin-bottom: var(--lgSpacing);`}
`;

export const SectionHeadingStyle = styled.h2`
  font-size: var(--mediumBig);
  padding: var(--medSpacing) 0;
  color: var(--primary);
  ${(props) => props.centerText && `text-align: center;`}
  ${(props) => props.marginBottom && `margin-bottom: var(--lgSpacing);`}
  ${(props) => props.marginTop && `margin-top: var(--lgSpacing);`}
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

export const PosterHeadingStyle = styled(CardHeadingStyle)`
  font-size: var(--normal);
  font-weight: 600;
`;

export const CardMovieDateStyle = styled.p`
  display: inline;
  color: var(--darkGray);
  font-size: var(--normal);
`;

export const CardMovieSummaryStyle = styled.p`
  font-size: var(--sm);
  overflow-y: hidden;
`;

export const CardSectionHeadingStyle = styled.h4`
  font-size: var(--normal);
  font-weight: 600px;
  margin-bottom: var(--smSpacing);
`;

export const TagStyle = styled(SimplePStyle)`
  background-color: var(--primaryContrast);
  border-radius: var(--cardBorderRadius);
  color: var(--primary);
  margin: 0 1rem;
  padding: ${(props) => (props.padding ? props.padding : `0 var(--smSpacing)`)};
`;
