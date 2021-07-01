import React, { useState } from "react";
import { Modal } from "../Global/Modal";
import { NoBorderButton, PrimaryButton } from "../styles/Buttons";
import { FlexContainer } from "../styles/Containers";
import { FormStyle, LabelStyle, TextInputStyle } from "../styles/Forms";
import { SectionHeadingStyle } from "../styles/Typography";
import { PlantModalContainerStyle } from "./styles/Containers";

export const NewPlantItemForm = ({ id, plantName, closePlantForm }) => {
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id, plantName, location);
    closePlantForm();
  };

  return (
    <Modal>
      <PlantModalContainerStyle>
        <SectionHeadingStyle centerText>
          {`Where's the new ${plantName}?`}
        </SectionHeadingStyle>
        <FormStyle onSubmit={handleSubmit}>
          <div>
            <LabelStyle htmlFor="location" hidden>
              Location
            </LabelStyle>
            <TextInputStyle
              type="text"
              name="location"
              autoFocus
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <FlexContainer flexDirection="column">
            <PrimaryButton
              fullwidth
              margin="0 0 var(--medSpacing) 0"
              as="input"
              type="submit"
              value={`Add ${plantName}`}
            />
            <NoBorderButton fullwidth onClick={closePlantForm}>
              Cancel
            </NoBorderButton>
          </FlexContainer>
        </FormStyle>
      </PlantModalContainerStyle>
    </Modal>
  );
};
