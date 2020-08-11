import React from "react";
import "./App.css";

import Search from "../src/components/utilities/Search";
import { CreateMovieCollection } from "./components/MovieCollections";

import { Login } from "./components/auth";

const App = () => {
  return (
    <div>
      <Login />
      <h1>Movie Tracker</h1>
      <CreateMovieCollection />
      <Search />
    </div>
  );
};

export default App;
