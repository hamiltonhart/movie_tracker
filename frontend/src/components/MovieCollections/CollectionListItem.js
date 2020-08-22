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
  },
  title: {
    color: theme.palette.primary.main,
  },
}));

export const CollectionListItem = ({ id, title }) => {
  const classes = useStyles();
  return (
    <Paper component={Link} to={`collections/${id}`} className={classes.root}>
      <Typography className={classes.title} variant="h5">
        {title}
      </Typography>
    </Paper>
  );
};
