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
import {
  PageHeadingStyle,
  SectionHeadingStyle,
  SimplePStyle,
  TagStyle,
} from "../components/styles/Typography";
import { FlexContainer } from "../components/styles/Containers";

import { NewPlantItemForm } from "../components/plants/NewPlantItemForm";
import { UpdatePlantForm } from "../components/plants/UpdatePlantForm";

// export const CollectionContext = createContext({});

export const PlantPage = () => {
  const params = useParams();
  const { data, loading, error } = useQuery(GET_PLANT, {
    variables: { id: params.plantId },
  });

  const { isShowing: isShowingAdd, toggle: toggleAdd } = useToggle();
  const { isShowing: isShowingEdit, toggle: toggleEdit } = useToggle();

  // const context = useContext(CollectionContext);

  // context.isShowingAdd = isShowingAdd;
  // context.toggleAdd = toggleAdd;
  // context.isShowingEdit = isShowingEdit;
  // context.toggleEdit = toggleEdit;
  // context.collection = data && data.movieCollection;
  // context.collectionItems = data && data.collectionItems;

  return (
    <FlexContainer flexDirection="column">
      {loading && <Loading />}
      {error && <Error message={error.message} />}
      {data && (
        <>
          <PageHeadingStyle>{data.plant.name}</PageHeadingStyle>
          <FlexContainer flexDirection="column" padding="0 var(--smSpacing)">
            <section className="plant-tags">
              <FlexContainer as="ul" padding="0 var(--smSpacing)">
                {data.plant.types.map((type) => (
                  <li key={type.typeLabel}>
                    <TagStyle>
                      <a
                        href={`https://en.wikipedia.org/wiki/${type.typeLabel}`}
                        target="_blank"
                        rel="noopener"
                        title={`${type.typeLabel} on Wikipedia`}
                      >
                        {type.typeLabel}
                      </a>
                    </TagStyle>
                  </li>
                ))}
              </FlexContainer>
            </section>
            <section className="plant-locations">
              <SectionHeadingStyle marginTop>
                Where Are They? ({data.plant.plants.length})
              </SectionHeadingStyle>
              <ol>
                {data.plant.plants.map((plant) => (
                  <li key={plant.id}>
                    <SimplePStyle>{plant.location}</SimplePStyle>
                  </li>
                ))}
              </ol>
            </section>
            <section className="plant-watering">
              <SectionHeadingStyle marginTop>
                Water: When, Where, How?
              </SectionHeadingStyle>
              {data.plant.waterInstructions ? (
                <SimplePStyle>{data.plant.waterInstructions}</SimplePStyle>
              ) : (
                <SimplePStyle>Nothing yet...</SimplePStyle>
              )}
            </section>
            <section className="plant-comments">
              <SectionHeadingStyle marginTop>Comments</SectionHeadingStyle>
              {data.plant.comments ? (
                <SimplePStyle>{data.plant.comments}</SimplePStyle>
              ) : (
                <SimplePStyle>Nothing yet...</SimplePStyle>
              )}
            </section>
            <FlexContainer
              className="buttons-heading"
              marginTop
              flexDirection="column"
            >
              <PrimaryButton
                onClick={toggleAdd}
                margin="0 0 var(--medSpacing) 0"
              >
                {`Add a ${data.plant.name}`}
              </PrimaryButton>
              <NoBorderButton
                onClick={toggleEdit}
              >{`Edit ${data.plant.name}`}</NoBorderButton>
              {isShowingAdd && (
                <NewPlantItemForm
                  id={data.plant.id}
                  plantName={data.plant.name}
                  closePlantForm={toggleAdd}
                />
              )}
              {isShowingEdit && (
                <UpdatePlantForm
                  id={data.plant.id}
                  plantName={data.plant.name}
                  plantTypes={data.plant.types}
                  plants={data.plant.plants}
                  closePlantForm={toggleEdit}
                />
              )}
            </FlexContainer>
          </FlexContainer>
        </>
      )}
    </FlexContainer>
  );
};
