import React, { useState } from "react";
import { useParams } from "@reach/router";
import { useQuery } from "@apollo/react-hooks";
import { MOVIE_COLLECTION } from "../gql";

import { makeStyles, Typography, Button } from "@material-ui/core";

import { Loading, Error } from "../components/Global";
import { CollectionItemsList } from "../components/CollectionItems/CollectionItemsList";
import { EditCollectionModal } from "../components/MovieCollections";
import { useToggle, Search } from "../components/utilities";
import { CreateCollectionItemManual } from "../components/CollectionItems/CreateCollectionItemManual";
import { PrimaryButton, SecondaryButton } from "../components/styles/Buttons";

const useStyles = makeStyles((theme) => ({
  pageHeading: { fontWeight: 600 },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(1),
  },
  collectionItemList: {
    marginTop: theme.spacing(2),
  },
}));

export const CollectionPage = () => {
  const params = useParams();
  const [rerenderParent, setRerenderParent] = useState(Math.random());
  const { data, loading, error } = useQuery(MOVIE_COLLECTION, {
    variables: { id: params.collectionId },
  });
  const { isShowing: isShowingAdd, toggle: toggleAdd } = useToggle();
  const { isShowing: isShowingEdit, toggle: toggleEdit } = useToggle();

  const classes = useStyles();

  const rerenderMovieList = () => {
    setRerenderParent(Math.random());
  };

  return (
    <div>
      {loading && <Loading />}
      {error && <Error message={error.message} />}
      {data && (
        <>
          <Typography
            className={classes.pageHeading}
            align="center"
            variant="h4"
          >
            {data.movieCollection.title}
          </Typography>
          <div className={classes.buttons}>
            <SecondaryButton onClick={toggleEdit} disabled={isShowingAdd}>
              Edit
            </SecondaryButton>
            <PrimaryButton onClick={toggleAdd}>
              {isShowingAdd ? "Cancel" : "Add Movie"}
            </PrimaryButton>
          </div>
          {isShowingAdd ? (
            <>
              <Search collectionId={params.collectionId} toggle={toggleAdd} />
              <CreateCollectionItemManual
                movieCollectionId={params.collectionId}
                toggle={toggleAdd}
              />
            </>
          ) : (
            <div className={classes.collectionItemList}>
              <CollectionItemsList
                items={data.movieCollection.movies}
                collectionId={params.collectionId}
                rerenderMovieList={rerenderMovieList}
              />
            </div>
          )}
          <EditCollectionModal
            isShowing={isShowingEdit}
            toggle={toggleEdit}
            id={data.movieCollection.id}
            collectionTitle={data.movieCollection.title}
          />
        </>
      )}
    </div>
  );
};
