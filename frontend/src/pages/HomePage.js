import React from "react";
import { Link } from "@reach/router";
import { CollectionList } from "../components/MovieCollections";
import { Login } from "../components/auth";

export const HomePage = () => {
  return (
    <div>
      <Login />
      <h1>Home Page</h1>
      <CollectionList />
    </div>
  );
};
