import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { MOVIE_COLLECTIONS } from "../../gql";

import { Error, Loading } from "../Global";
import { CollectionListItem } from "./CollectionListItem";
import { FlexContainer } from "../styles/Containers";

export const CollectionList = () => {
  const { data, loading, error } = useQuery(MOVIE_COLLECTIONS);

  return (
    <FlexContainer flexDirection="column">
      {loading && <Loading />}
      {error && <Error message={error.message} />}
      {data && (
        <>
          {data.movieCollections.map((collection) => (
            <CollectionListItem
              key={collection.id}
              id={collection.id}
              title={collection.title}
            />
          ))}
        </>
      )}
    </FlexContainer>
  );
};
