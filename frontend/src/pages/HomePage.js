import React from "react";
import {
  CollectionList,
  CreateMovieCollection,
} from "../components/MovieCollections";

import { useToggle } from "../components/utilities";

import { makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

export const HomePage = () => {
  const { isShowing, toggle } = useToggle();

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button variant="outlined" size="large" color="primary" onClick={toggle}>
        Create A Collection
      </Button>
      <CreateMovieCollection isShowing={isShowing} toggle={toggle} />
      <CollectionList />
    </div>
  );
};
