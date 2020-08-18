import React from "react";

import { useToggle } from "../utilities";

import { makeStyles, Modal, Paper } from "@material-ui/core";
import { DeleteMovieCollection } from "./DeleteCollection";
import { UpdateMovieCollection } from "./UpdateMovieCollection";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "85%",
    maxWidth: "85%",
    padding: theme.spacing(3),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "100%",
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
  },
}));

export const EditCollectionModal = ({
  isShowing,
  toggle,
  id,
  collectionTitle,
}) => {
  const { isShowing: isShowingDelete, toggle: toggleDelete } = useToggle();

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Modal className={classes.modal} open={isShowing}>
        <Paper className={classes.paper}>
          {isShowingDelete ? (
            <DeleteMovieCollection
              isShowing={isShowingDelete}
              toggle={toggleDelete}
              id={id}
            />
          ) : (
            <UpdateMovieCollection
              toggle={toggle}
              id={id}
              collectionTitle={collectionTitle}
              toggleDelete={toggleDelete}
            />
          )}
        </Paper>
      </Modal>
    </div>
  );
};
