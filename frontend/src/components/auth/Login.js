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
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    minWidth: "400px",
    maxWidth: "500px",
  },
  heading: {
    textTransform: "uppercase",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
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
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h3" align="center">
          Hi, Darling!
        </Typography>
        <Typography variant="body1" align="center">
          (Just making sure it's you.)
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
          <Button
            variant="contained"
            size="large"
            color="primary"
            type="submit"
          >
            See My Movies
          </Button>
        </form>
        {error && <p>{error.message}</p>}
      </Paper>
    </div>
  );
};
