import React from "react";
import "./App.css";
import { Router, Link } from "@reach/router";
import { HomePage } from "./pages/HomePage";
import { CollectionPage } from "./pages/CollectionPage";

const App = () => {
  return (
    <div>
      <Link to="/">
        <h1>Movie Tracker</h1>
      </Link>
      <Router>
        <HomePage path="/" />
        <CollectionPage path="collections/:collectionId" />
      </Router>
    </div>
  );
};

export default App;
