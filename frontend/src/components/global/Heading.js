import React from "react";

import { makeStyles, Typography } from "@material-ui/core";
import { Link } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3),
  },
}));

export const Heading = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Link to="/">
        <Typography variant="h4">BMDb</Typography>
      </Link>
    </div>
  );
};
