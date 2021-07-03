import React, { useState } from "react";
import { NoBorderButton, PrimaryButton } from "../styles/Buttons";
import { FlexContainer } from "../styles/Containers";
import { FormStyle, LabelStyle, TextInputStyle } from "../styles/Forms";

export const NewPlantForm = ({ closePlantForm }) => {
  const [name, setName] = useState("");
  const [types, setTypes] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, types, location);
  };

  return (
    <FormStyle onSubmit={handleSubmit}>
      <div>
        <LabelStyle htmlFor="name">Name</LabelStyle>
        <TextInputStyle
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <LabelStyle htmlFor="types">Type</LabelStyle>
        <TextInputStyle
          type="text"
          name="types"
          onChange={(e) => setTypes(e.target.value)}
        />
      </div>
      <div>
        <LabelStyle htmlFor="location">Location</LabelStyle>
        <TextInputStyle
          type="text"
          name="location"
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <FlexContainer flexDirection="column">
        <PrimaryButton
          fullwidth
          margin="0 0 var(--medSpacing) 0"
          as="input"
          type="submit"
          value="Add Plant"
          disabled={!name || !types || !location}
        />
        <NoBorderButton fullwidth onClick={closePlantForm}>
          Cancel
        </NoBorderButton>
      </FlexContainer>
    </FormStyle>
  );
};
