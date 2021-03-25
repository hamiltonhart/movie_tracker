import React from "react";
import ReactDOM from "react-dom";
import "dotenv/config";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import ApolloClient, { gql } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";

import { PrimaryLayout } from "./components/Global";
import { Login } from "./components/auth/Login";

const cache = new InMemoryCache({
  typePolicies: {
    CollectionItems: {
      keyFields: ["id"],
    },
  },
});

const uri =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/graphql/"
    : "https://brandi-movie-tracker.herokuapp.com/graphql/";

export const client = new ApolloClient({
  cache,
  uri,
  fetchOptions: {
    credentials: "include",
  },
  request: (operation) => {
    const token = localStorage.getItem("authToken") || "";
    operation.setContext({
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
  },
  clientState: {
    defaults: {
      isLoggedIn: !!localStorage.getItem("authToken"),
    },
  },
});

export const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const InitialLogin = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  return <>{data && data.isLoggedIn ? <App /> : <Login />}</>;
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <PrimaryLayout>
      <InitialLogin />
    </PrimaryLayout>
  </ApolloProvider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
