import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { MOVIE_COLLECTIONS } from "../../gql";

import { Error, Loading } from "../global";
import { CollectionListItem } from "./CollectionListItem";
import { DeleteCollection } from "./DeleteCollection";

export const CollectionList = () => {
  const { data, loading, error } = useQuery(MOVIE_COLLECTIONS);

  return (
    <div>
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
