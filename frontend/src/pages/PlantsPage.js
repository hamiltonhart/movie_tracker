import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_PLANTS } from "../gql";

import { Error, Loading } from "../components/Global";
import { FlexContainer } from "../components/styles/Containers";
import { Link } from "@reach/router";
import { NewPlantForm } from "../components/plants/NewPlantForm";
import {
  LinkHeadingStyle,
  PageHeadingStyle,
} from "../components/styles/Typography";
import { useToggle } from "../components/utilities/useToggle";
import { SecondaryButton } from "../components/styles/Buttons";

export const PlantsPage = () => {
  const { toggle: togglePlantForm, isShowing: isShowingPlantForm } =
    useToggle();
  const { data, loading, error } = useQuery(GET_ALL_PLANTS);

  return (
    <div>
      <PageHeadingStyle marginBottom>Plants</PageHeadingStyle>

      {isShowingPlantForm ? (
        <NewPlantForm closePlantForm={togglePlantForm} />
      ) : (
        <SecondaryButton fullwidth onClick={togglePlantForm}>
          Add A New Plant
        </SecondaryButton>
      )}
      {!isShowingPlantForm && (
        <FlexContainer flexDirection="column" marginTop>
          {loading && <Loading />}
          {error && <Error message={error.message} />}
          {data &&
            data.plants.map((plant) => (
              <LinkHeadingStyle
                key={plant.id}
                to={`/plants/${plant.id}`}
                as={Link}
              >
                {plant.name}
              </LinkHeadingStyle>
            ))}
        </FlexContainer>
      )}
    </div>
  );
};
