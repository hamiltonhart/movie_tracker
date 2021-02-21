import React from "react";
import {
  CollectionList,
  CreateMovieCollection,
} from "../components/MovieCollections";

import { useToggle } from "../components/utilities";

import { makeStyles, Button } from "@material-ui/core";
import { SecondaryButton } from "../components/styles/Buttons";

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
      <SecondaryButton onClick={toggle}>Start A New List</SecondaryButton>
      <CreateMovieCollection isShowing={isShowing} toggle={toggle} />
      <CollectionList />
    </div>
  );
};
