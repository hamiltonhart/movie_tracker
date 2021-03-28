import React from "react";
import { GridContainer } from "../styles/Containers";
import MovieSearchListItem from "./MovieSearchListItem";

const MovieSearchList = ({ collectionId, movieList, toggle }) => {
  return (
    <GridContainer>
      {movieList.map((movie) => (
        <MovieSearchListItem
          key={movie.id}
          collectionId={collectionId}
          movie={movie}
          toggle={toggle}
        />
      ))}
    </GridContainer>
  );
};

export default MovieSearchList;
