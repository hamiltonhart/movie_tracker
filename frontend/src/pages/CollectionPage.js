import React from "react";
import { useParams } from "@reach/router";
import { useQuery } from "@apollo/react-hooks";
import { MOVIE_COLLECTION_AND_ITEMS } from "../gql";

import { Loading, Error } from "../components/Global";
import { CollectionItemsList } from "../components/CollectionItems/CollectionItemsList";
import { EditCollection } from "../components/MovieCollections";
import { useToggle, Search } from "../components/utilities";
import { CreateCollectionItemManual } from "../components/CollectionItems/CreateCollectionItemManual";
import { NoBorderButton, PrimaryButton } from "../components/styles/Buttons";
import { PageHeadingStyle } from "../components/styles/Typography";
import { FlexContainer } from "../components/styles/Containers";

export const CollectionPage = () => {
  const params = useParams();
  const { data, loading, error } = useQuery(MOVIE_COLLECTION_AND_ITEMS, {
    variables: { id: params.collectionId, collectionId: params.collectionId },
  });
  const { isShowing: isShowingAdd, toggle: toggleAdd } = useToggle();
  const { isShowing: isShowingEdit, toggle: toggleEdit } = useToggle();

  return (
    <div>
      {loading && <Loading />}
      {error && <Error message={error.message} />}
      {data && (
        <>
          {/* In-place Edit Collection */}
          {isShowingEdit ? (
            <EditCollection
              isShowing={isShowingEdit}
              toggle={toggleEdit}
              id={data.movieCollection.id}
              collectionTitle={data.movieCollection.title}
            />
          ) : (
            <PageHeadingStyle align="center">
              {data.movieCollection.title}
            </PageHeadingStyle>
          )}
          {!isShowingEdit && !isShowingAdd && (
            <div>
              <FlexContainer
                justifyContent="space-between"
                padding="1.6rem 0.8rem 1.6rem 0.8rem"
              >
                <>
                  <NoBorderButton onClick={toggleEdit} disabled={isShowingAdd}>
                    Edit
                  </NoBorderButton>
                  <PrimaryButton onClick={toggleAdd}>Add Movie</PrimaryButton>
                </>
              </FlexContainer>
              <div>
                <CollectionItemsList
                  items={data.collectionItems}
                  collectionId={params.collectionId}
                />
              </div>
            </div>
          )}

          {isShowingAdd && (
            <div>
              <Search collectionId={params.collectionId} toggle={toggleAdd} />
              <CreateCollectionItemManual
                movieCollectionId={params.collectionId}
                toggle={toggleAdd}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
