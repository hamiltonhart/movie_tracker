import React from "react";
import { useParams } from "@reach/router";
import { useQuery } from "@apollo/react-hooks";
import { MOVIE_COLLECTION } from "../gql";

import { makeStyles, Typography, Button } from "@material-ui/core";

import { Loading, Error } from "../components/Global";
import { CollectionItemsList } from "../components/CollectionItems/CollectionItemsList";

import { useToggle, Search } from "../components/utilities";

const useStyles = makeStyles((theme) => ({
  newCollectionToggle: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: theme.spacing(1),
  },
  collectionItemList: {
    marginTop: theme.spacing(2),
  },
}));

export const CollectionPage = () => {
  const params = useParams();
  const { data, loading, error } = useQuery(MOVIE_COLLECTION, {
    variables: { id: params.collectionId },
  });
  const { isShowing, toggle } = useToggle();

  const classes = useStyles();
  return (
    <div>
      {loading && <Loading />}
      {error && <Error message={error.message} />}
      {data && (
        <>
          <Typography variant="h5">{data.movieCollection.title}</Typography>
          <div className={classes.newCollectionToggle}>
            <Button onClick={toggle} variant="outlined">
              {isShowing ? "Cancel" : "Add Movie"}
            </Button>
          </div>
          {isShowing ? (
            <Search collectionId={params.collectionId} toggle={toggle} />
          ) : (
            <div className={classes.collectionItemList}>
              <CollectionItemsList items={data.movieCollection.movies} />
            </div>
          )}
        </>
      )}
    </div>
  );
};
