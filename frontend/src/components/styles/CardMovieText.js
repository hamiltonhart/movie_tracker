import styled from "styled-components";

export const CardMovieText = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  margin-left: 1.6rem;
  margin-right: 0.8rem;
  & > * {
    margin-bottom: 0.8rem;
  }
  h3 {
    display: inline;
    font-size: 1.8rem;
    padding-bottom: 0.4rem;
  }
  .movieDate {
    display: inline;
    color: var(--gray);
    font-size: 1.2rem;
  }
  div {
    overflow-y: hidden;
  }
  p {
    font-size: 1.2rem;
  }
`;
