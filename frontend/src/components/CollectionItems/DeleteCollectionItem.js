import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { useToggle } from "../utilities";
import { DELETE_COLLECTION_ITEM, MOVIE_COLLECTION } from "../../gql";
import { NoBorderButton, PrimaryButton } from "../styles/Buttons";
import { makeStyles, Modal, Paper } from "@material-ui/core";
import { Error } from "../Global";

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
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      marginTop: theme.spacing(1),
    },
  },
}));

export const DeleteCollectionItem = ({ id, title, collectionId }) => {
  const [deleteCollectionItem, { error }] = useMutation(DELETE_COLLECTION_ITEM);
  const { isShowing, toggle } = useToggle();

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    toggle();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    console.log("Delete this.");
    deleteCollectionItem({
      variables: { id },
      refetchQueries: [
        { query: MOVIE_COLLECTION, variables: { id: collectionId } },
      ],
      onCompleted: handleCompleted(),
    });
  };

  const handleCompleted = () => {
    toggle();
  };

  const classes = useStyles();
  return (
    <>
      <NoBorderButton onClick={(e) => handleRemoveClick(e)}>
        Remove
      </NoBorderButton>
      {isShowing && (
        <div className={classes.root}>
          <Modal className={classes.modal} open={isShowing}>
            <Paper className={classes.paper}>
              <p>Are you sure?</p>
              <div className={classes.buttonContainer}>
                <PrimaryButton
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={(e) => handleDelete(e)}
                >
                  I'm sure. Delete!
                </PrimaryButton>
                <NoBorderButton onClick={toggle}>No. Keep It</NoBorderButton>
              </div>
              {error && <Error message={error.message} />}
            </Paper>
          </Modal>
        </div>
      )}
    </>
  );
};
