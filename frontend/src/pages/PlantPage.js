import React from "react";
import { useParams } from "@reach/router";
import { useQuery } from "@apollo/react-hooks";
import { GET_PLANT } from "../gql";

import { Loading, Error } from "../components/Global";
// import { CollectionItemsList } from "../components/CollectionItems/CollectionItemsList";
// import { EditCollection } from "../components/MovieCollections";
import { useToggle, Search } from "../components/utilities";
// import { CreateCollectionItemManual } from "../components/CollectionItems/CreateCollectionItemManual";
import { NoBorderButton, PrimaryButton } from "../components/styles/Buttons";
import { PageHeadingStyle } from "../components/styles/Typography";
import { FlexContainer } from "../components/styles/Containers";

// export const CollectionContext = createContext({});

export const PlantPage = () => {
  const params = useParams();
  const { data, loading, error } = useQuery(GET_PLANT, {
    variables: { id: params.plantId },
  });

  // const { isShowing: isShowingAdd, toggle: toggleAdd } = useToggle();
  // const { isShowing: isShowingEdit, toggle: toggleEdit } = useToggle();

  // const context = useContext(CollectionContext);

  // context.isShowingAdd = isShowingAdd;
  // context.toggleAdd = toggleAdd;
  // context.isShowingEdit = isShowingEdit;
  // context.toggleEdit = toggleEdit;
  // context.collection = data && data.movieCollection;
  // context.collectionItems = data && data.collectionItems;

  return (
    <div>
      {loading && <Loading />}
      {error && <Error message={error.message} />}
      {data && (
        <div>
          <h1>{data.plant.name}</h1>
          <h2>Type</h2>
          <ul>
            {data.plant.types.map((type) => (
              <li key={type.typeLabel}>{type.typeLabel}</li>
            ))}
          </ul>
          <h2>Locations</h2>
          <ul>
            {data.plant.plants.map((plant) => (
              <li key={plant.id}>{plant.location}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
