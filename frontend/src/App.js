import React from "react";
import "./App.css";
import { Router, Link } from "@reach/router";
import { HomePage } from "./pages/HomePage";
import { CollectionPage } from "./pages/CollectionPage";
import { Heading } from "./components/Global";
import { PrimaryLayout } from "./components/Global";

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
