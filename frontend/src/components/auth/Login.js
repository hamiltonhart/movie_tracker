import React, { useState } from "react";
import {
  makeStyles,
  Paper,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";

import { LOGIN } from "../../gql";
import { useMutation, useApolloClient } from "@apollo/react-hooks";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    maxWidth: "500px",
  },
  heading: {
    textTransform: "uppercase",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
}));

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

  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography variant="h3" align="center">
        Sign In
      </Typography>
      <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
        <TextField
          type="text"
          color="primary"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></TextField>
        <TextField
          type="password"
          color="primary"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></TextField>
        <Button variant="contained" size="large" color="primary" type="submit">
          Sign In
        </Button>
      </form>
      {error && <p>{error.message}</p>}
    </Paper>
  );
};
