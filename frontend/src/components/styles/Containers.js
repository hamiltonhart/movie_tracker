import styled from "styled-components";

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "row"};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "center"};
  padding: ${(props) => (props.padding ? props.padding : "0.8rem")};
  ${(props) => props.topBorder && `border-top: 2px solid var(--gray);`}
`;

export const CardStyle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: var(--cardBorderRadius);
  box-shadow: var(--bs);
  height: ${(props) => (props.expanded ? `auto` : `var(--cardHeight)`)};
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

export const CardMovieContentContainerStyle = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;

export const CardMovieInfoContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 0.8rem;
  padding-bottom: 1.6rem;
  margin-left: 1.6rem;
  margin-right: 1.6rem;
  overflow-y: hidden;
  width: 100%;
  max-height: var(--cardHeight);
`;

export const PrimaryCardButtonContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.6rem;
  height: 100%;
  justify-content: flex-end;
`;

export const CardMoreInfoContainerStyle = styled.div`
  div {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 1.6rem;
  }
`;
