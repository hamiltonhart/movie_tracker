import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import { HomePage } from "./pages/HomePage";
import { CollectionPage } from "./pages/CollectionPage";

const App = () => {
  return (
    <>
      <Router>
        <HomePage path="/" />
        <CollectionPage path="collections/:collectionId" />
      </Router>
    </>
  );
};

export default App;
