import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_PLANTS } from "../gql";

import { Error, Loading } from "../components/Global";
import { FlexContainer } from "../components/styles/Containers";
import { Link } from "@reach/router";
import { NewPlantForm } from "../components/plants/NewPlantForm";
import { PageHeadingStyle } from "../components/styles/Typography";

export const PlantsPage = () => {
  const { data, loading, error } = useQuery(GET_ALL_PLANTS);

  return (
    <div>
      <PageHeadingStyle>Plants</PageHeadingStyle>
      <NewPlantForm />
      {loading && <Loading />}
      {error && <Error message={error.message} />}
      {data && (
        <ul>
          {data.plants.map((plant) => (
            <li key={plant.id}>
              <h2>
                <Link to={`${plant.id}`}>{plant.name}</Link>
              </h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
