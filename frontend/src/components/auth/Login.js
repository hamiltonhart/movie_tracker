import React, { useState } from "react";

import { GlobalStyle } from "../styles/GlobalStyles";
import { FormStyle, PasswordInputStyle, TextInputStyle } from "../styles/Forms";
import { PrimaryButton } from "../styles/Buttons";
import { FlexContainer } from "../styles/Containers";

import { LOGIN } from "../../gql";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { PageHeadingStyle, SimplePStyle } from "../styles/Typography";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [tokenAuth, { error }] = useMutation(LOGIN);
  const client = useApolloClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await tokenAuth({
      variables: { username, password },
      onComplete: loginComplete(),
    });
    localStorage.setItem("authToken", res.data.tokenAuth.token);
    client.writeData({ data: { isLoggedIn: true } });
  };

  const loginComplete = () => {
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <GlobalStyle />
      <FlexContainer flexDirection="column">
        <PageHeadingStyle>Hi, Darling!</PageHeadingStyle>
        <SimplePStyle variant="body1" textAlign="center">
          Just making sure it's you ;)
        </SimplePStyle>
        <FormStyle onSubmit={(e) => handleSubmit(e)}>
          <TextInputStyle
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <PasswordInputStyle
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PrimaryButton
            as="input"
            type="submit"
            fullwidth
            value="Let me in!"
          />
        </FormStyle>
        {error && <p>{error.message}</p>}
      </FlexContainer>
    </>
  );
};
