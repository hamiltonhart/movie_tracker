import styled from "styled-components";

export const FlexContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "row"};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "center"};
  padding: ${(props) => (props.padding ? props.padding : `var(--smSpacing)`)};
  ${(props) => props.topBorder && `border-top: 2px solid var(--gray);`}
  ${(props) =>
    props.backgroundColor && `background-color: ${props.backgroundColor}`};
  ${(props) =>
    props.radius === "normal" && `border-radius: var(--cardBorderRadius)`};
`;

export const CardStyle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: var(--cardBorderRadius);
  box-shadow: var(--bs);
  height: ${(props) => (props.expanded ? `auto` : `var(--cardHeight)`)};
  margin-top: var(--xxlSpacing);
  margin-bottom: var(xxlSpacing);
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
  margin-left: var(--medSpacing);
  margin-right: var(--medSpacing);
  overflow-y: hidden;
  width: 100%;
  max-height: var(--cardHeight);
`;

export const PrimaryCardButtonContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: var(--medSpacing);
  height: 100%;
  justify-content: flex-end;
`;

export const CardMoreInfoContainerStyle = styled.div`
  div {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-bottom: var(--medSpacing);
  }
`;
