import React, { useState } from "react";
import MovieSearchList from "../movies/MovieSearchList";

const Search = () => {
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

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log(searchInput);
  //   };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Search Movies"
          value={searchInput}
          onChange={(e) => handleSearchInput(e)}
        />
        <input type="submit" value="Search" />
      </form>
      {movieList ? (
        <MovieList movieList={movieList} />
      ) : (
        <h3>Enter Search Above</h3>
      )}
    </div>
  );
};

const MovieList = (movieList) => {
  return <MovieSearchList movieList={movieList.movieList} />;
};

export default Search;
