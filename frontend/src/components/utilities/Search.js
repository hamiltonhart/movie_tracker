import React, { useState } from "react";

import { makeStyles, TextField, Button } from "@material-ui/core";

import MovieSearchList from "../movies/MovieSearchList";

const useStyles = makeStyles((theme) => ({
  root: {},
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  searchButton: {
    marginTop: theme.spacing(1),
  },
}));

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

  const classes = useStyles();

  return (
    <div>
      <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
        <TextField
          type="text"
          placeholder="Movie Title"
          autoFocus
          fullWidth
          value={searchInput}
          onChange={(e) => handleSearchInput(e)}
        />
        <Button
          as="input"
          type="submit"
          className={classes.searchButton}
          variant="contained"
          color="primary"
          fullWidth
        >
          Find Movie
        </Button>
      </form>
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
