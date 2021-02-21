import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import { HomePage } from "./pages/HomePage";
import { CollectionPage } from "./pages/CollectionPage";
import { GlobalStyle } from "./components/styles/GlobalStyles";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <HomePage path="/" />
        <CollectionPage path="collections/:collectionId" />
      </Router>
    </>
  );
};

export default App;
