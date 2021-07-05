import React, { useState } from "react";
import { Modal } from "../Global/Modal";
import { NoBorderButton, PrimaryButton } from "../styles/Buttons";
import { FlexContainer } from "../styles/Containers";
import {
  FormStyle,
  LabelStyle,
  TextareaInputStyle,
  TextInputStyle,
} from "../styles/Forms";
import { SectionHeadingStyle } from "../styles/Typography";
import { PlantModalContainerStyle } from "./styles/Containers";

import { useParams } from "@reach/router";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_PLANT, UPDATE_PLANT } from "../../gql";

import { Loading, Error } from "../Global";

export const UpdatePlantForm = ({ closePlantForm }) => {
  const params = useParams();

  // Query
  const { data, loading, error } = useQuery(GET_PLANT, {
    variables: { id: params.plantId },
  });

  // State
  const [name, setName] = useState(data ? data.plant.name : "");
  const [types, setTypes] = useState(
    data
      ? data.plant.types.map((plantType) => plantType.typeLabel).join(",")
      : ""
  );
  const [plants, setPlants] = useState(
    data
      ? data.plant.plants.map((plant) =>
          Object.values(plant).map((item) => item.toString())
        )
      : []
  );
  const [wateringInstructions, setWateringInstructions] = useState(
    data ? data.plant.wateringInstructions : ""
  );
  const [comments, setComments] = useState(data ? data.plant.comments : "");

  // Update Mutation
  const [updatePlant, { error: updateError }] = useMutation(UPDATE_PLANT, {
    refetchQueries: { query: GET_PLANT, variables: { id: data.plant.id } },
  });

  const handleLocationChange = (e, index) => {
    const tempList = [...plants];
    const tempItem = [...plants[index]];
    tempItem[1] = e.target.value;
    tempList[index] = tempItem;
    setPlants(tempList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePlant({
      variables: {
        id: data.plant.id,
        name,
        types,
        comments,
        plants,
        wateringInstructions,
      },
    });
    closePlantForm();
  };

  return (
    <Modal>
      <PlantModalContainerStyle>
        <SectionHeadingStyle centerText>{`Edit ${name}`}</SectionHeadingStyle>
        {loading && <Loading />}
        {error && <Error message={error.message} />}
        {data && (
          <>
            <FormStyle onSubmit={handleSubmit}>
              <FlexContainer flexDirection="column" bottomBorder>
                <div className="margin-bottom">
                  <LabelStyle htmlFor="name">Name</LabelStyle>
                  <TextInputStyle
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="margin-bottom">
                  <LabelStyle htmlFor="types">
                    Types (separate with commas)
                  </LabelStyle>
                  <TextInputStyle
                    type="text"
                    name="types"
                    value={types}
                    onChange={(e) => setTypes(e.target.value)}
                  />
                </div>
              </FlexContainer>

              <FlexContainer flexDirection="column" bottomBorder>
                {plants.map((plant, index) => (
                  <div key={index} className="margin-bottom">
                    <LabelStyle
                      htmlFor={`plant${index + 1}-location`}
                    >{`Plant ${index + 1} Location`}</LabelStyle>
                    <TextInputStyle
                      type="text"
                      name={`plant${index + 1}-location`}
                      value={plant[1]}
                      onChange={(e) => handleLocationChange(e, index)}
                    />
                  </div>
                ))}
              </FlexContainer>

              <FlexContainer flexDirection="column">
                <div className="margin-bottom">
                  <LabelStyle htmlFor="name">Watering Instructions</LabelStyle>
                  <TextareaInputStyle
                    type="text"
                    name="water-instructions"
                    value={wateringInstructions}
                    onChange={(e) => setWateringInstructions(e.target.value)}
                  />
                </div>
                <div className="margin-bottom">
                  <LabelStyle htmlFor="types">Comments</LabelStyle>
                  <TextareaInputStyle
                    type="text"
                    name="comments"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                  />
                </div>
              </FlexContainer>

              <FlexContainer flexDirection="column">
                <PrimaryButton
                  fullwidth
                  margin="0 0 var(--medSpacing) 0"
                  as="input"
                  type="submit"
                  value={`Update ${data.plant.name}`}
                  disabled={!name || !types}
                />
                <NoBorderButton fullwidth onClick={closePlantForm}>
                  Cancel
                </NoBorderButton>
              </FlexContainer>
            </FormStyle>
          </>
        )}
      </PlantModalContainerStyle>
    </Modal>
  );
};
