import React from "react";
import { PrimaryButton } from "../styles/Buttons";
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
    <PrimaryButton color="secondary" onClick={() => handleLogout()}>
      Sign Out
    </PrimaryButton>
  );
};
