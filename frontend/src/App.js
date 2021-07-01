import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import { HomePage } from "./pages/HomePage";
import { CollectionPage } from "./pages/CollectionPage";
import { GlobalStyle } from "./components/styles/GlobalStyles";
import { PlantsPage } from "./pages/PlantsPage";
import { PlantPage } from "./pages/PlantPage";
import { MoviesPage } from "./pages/MoviesPage";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <HomePage path="/" />
        <MoviesPage path="/collections" />
        <CollectionPage path="/collections/:collectionId" />
        <PlantsPage path="/plants" />
        <PlantPage path="/plants/:plantId" />
      </Router>
    </>
  );
};

export default App;
