import React from "react";
import { Button } from "@material-ui/core";
import { useApolloClient } from "@apollo/react-hooks";
import { navigate } from "@reach/router";

export const Logout = () => {
  const client = useApolloClient();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    client.writeData({ data: { isLoggedIn: false } });
    navigate("/");
  };

  return (
    <Button color="secondary" onClick={() => handleLogout()}>
      Sign Out
    </Button>
  );
};
