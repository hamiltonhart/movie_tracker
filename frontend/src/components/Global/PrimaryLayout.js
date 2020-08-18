import React from "react";
import { Heading } from "./Heading";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  childrenDiv: {
    padding: theme.spacing(2),
  },
}));

export const PrimaryLayout = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Heading />
      <div className={classes.childrenDiv}>{children}</div>
    </div>
  );
};
