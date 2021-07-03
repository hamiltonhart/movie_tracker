import { motion } from "framer-motion";
import styled from "styled-components";

export const FlexContainer = styled(motion.div)`
  display: flex;
  position: relative;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "row"};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "center"};
  padding: ${(props) => (props.padding ? props.padding : `var(--smSpacing)`)};
  ${(props) => props.topBorder && `border-top: 2px solid var(--gray);`}
  ${(props) => props.bottomBorder && `border-bottom: 2px solid var(--gray);`}
  ${(props) =>
    props.backgroundColor && `background-color: ${props.backgroundColor}`};
  ${(props) =>
    props.radius === "normal" && `border-radius: var(--cardBorderRadius)`};
  ${(props) => props.overflow && `overflow: ${props.overflow}`};
  ${(props) => props.marginBottom && `margin-bottom: var(--lgSpacing);`}
  ${(props) => props.marginTop && `margin-top: var(--lgSpacing);`}
  margin: ${(props) => (props.margin ? props.margin : "0")};

  ol li {
    list-style-type: decimal;
    margin-left: var(--medSpacing);
  }

  ol li::marker {
    color: var(--darkGrey);
  }

  .margin-bottom {
    margin-bottom: var(--medSpacing);
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: var(--lgSpacing);
`;

export const MoviePosterContainer = styled(motion.article)`
  position: relative;
  text-align: center;
  cursor: pointer;
  max-width: 200px;
`;

export const MoviePosterSpan = styled.span`
  position: relative;
  display: inline-block;

  span {
    position: absolute;
    top: 0;
    left: 0;
    height: 3.3rem;
    background-color: yellow;
    padding: 5px;
    border-top-left-radius: var(--cardBorderRadius);
    border-bottom-right-radius: var(--cardBorderRadius);
  }
`;

export const CardStyle = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: var(--cardBorderRadius);
  max-height: 90vh;
  background-color: var(--white);
  overflow: scroll;
  /* min-width: 95vw; */
  width: 95vw;
  max-width: 510px;
`;

export const CardMovieContentContainerStyle = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;

export const CardMovieInfoContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: var(--xsSpacing);
  padding-bottom: var(--medSpacing);
  margin-top: 4.2rem;
  margin-left: var(--medSpacing);
  margin-right: var(--medSpacing);
  overflow-y: hidden;
  width: 100%;
  max-height: var(--cardHeight);
`;

export const PrimaryCardButtonContainerStyle = styled.div`
  display: grid;
  flex-direction: column;
  margin-top: var(--medSpacing);
  height: 100%;
  justify-content: flex-end;
`;

export const CardButtonBottomStyle = styled(motion.div)`
  display: grid;
  grid-template-columns: 31% 31% 31%;
  grid-gap: var(--xsSpacing);
  margin-top: var(--medSpacing);
`;

export const CardMoreInfoContainerStyle = styled(motion.div)`
  margin-bottom: var(--medSpacing);
  /* div {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-bottom: var(--medSpacing);
    overflow: hidden;
  } */
`;
