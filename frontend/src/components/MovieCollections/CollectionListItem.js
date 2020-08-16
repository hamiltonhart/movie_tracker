import React from "react";
import { Link } from "@reach/router";

import { makeStyles, Typography, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
  },
}));

export const CollectionListItem = ({ id, title }) => {
  const classes = useStyles();
  return (
    <Paper component={Link} to={`collections/${id}`} className={classes.root}>
      <Typography variant="h5">{title}</Typography>
    </Paper>
  );
};
