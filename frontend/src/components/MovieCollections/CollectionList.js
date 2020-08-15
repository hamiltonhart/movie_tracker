import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { MOVIE_COLLECTIONS } from "../../gql";

import { makeStyles } from "@material-ui/core";

import { Error, Loading } from "../Global";
import { CollectionListItem } from "./CollectionListItem";
import { DeleteCollection } from "./DeleteCollection";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
}));

export const CollectionList = () => {
  const { data, loading, error } = useQuery(MOVIE_COLLECTIONS);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      {loading && <Loading />}
      {error && <Error message={error.message} />}
      {data && (
        <>
          {data.movieCollections.map((collection) => (
            <>
              <CollectionListItem
                key={collection.id}
                id={collection.id}
                title={collection.title}
              />
              <DeleteCollection id={collection.id} />
            </>
          ))}
        </>
      )}
    </div>
  );
};
