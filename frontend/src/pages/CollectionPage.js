import React from "react";
import { useParams } from "@reach/router";
import { useQuery } from "@apollo/react-hooks";
import { MOVIE_COLLECTION } from "../gql";
import { Loading, Error } from "../components/Global";
import { CollectionItemsList } from "../components/CollectionItems/CollectionItemsList";

export const CollectionPage = () => {
  const params = useParams();
  const { data, loading, error } = useQuery(MOVIE_COLLECTION, {
    variables: { id: params.collectionId },
  });
  return (
    <div>
      {loading && <Loading />}
      {error && <Error message={error.message} />}
      {data && (
        <>
          <h1>{data.movieCollection.title}</h1>
          <CollectionItemsList items={data.movieCollection.movies} />
        </>
      )}
    </div>
  );
};
