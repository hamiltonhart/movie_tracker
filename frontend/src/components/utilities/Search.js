import React, { useState } from "react";

import { FormStyle, TextInputStyle } from "../styles/Forms";

import MovieSearchList from "../movies/MovieSearchList";
import { NoBorderButton, PrimaryButton } from "../styles/Buttons";

export const Search = ({ collectionId, toggle }) => {
  const [searchInput, setSearchInput] = useState("");
  const [movieList, setMovieList] = useState(null);

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=f959cc25ecbea5871df941133bb83cad&language=en-US&query=${searchInput}&page=1&include_adult=false`
      );
      const movies = await res.json();
      setMovieList(movies.results);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <FormStyle onSubmit={(e) => handleSubmit(e)}>
        <TextInputStyle
          placeholder="Search for a Movie Title"
          autoFocus
          value={searchInput}
          onChange={(e) => handleSearchInput(e)}
        />
        <PrimaryButton as="input" type="submit" fullwidth value="Find Movie" />
        <NoBorderButton fullwidth onClick={toggle}>
          Cancel
        </NoBorderButton>
      </FormStyle>
      {movieList && (
        <MovieList
          movieList={movieList}
          collectionId={collectionId}
          toggle={toggle}
        />
      )}
    </div>
  );
};

const MovieList = ({ movieList, collectionId, toggle }) => {
  return (
    <MovieSearchList
      collectionId={collectionId}
      movieList={movieList}
      toggle={toggle}
    />
  );
};
