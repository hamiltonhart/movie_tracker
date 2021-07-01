import React, { useState } from "react";
import { PrimaryButton } from "../styles/Buttons";
import { FlexContainer } from "../styles/Containers";
import { FormStyle, LabelStyle, TextInputStyle } from "../styles/Forms";

export const NewPlantForm = () => {
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
      <FlexContainer>
        <PrimaryButton as="input" type="submit" value="Add Plant" />
      </FlexContainer>
    </FormStyle>
  );
};
