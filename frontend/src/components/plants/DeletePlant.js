import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { NoBorderButton, PrimaryButton } from "../styles/Buttons";
import { FlexContainer } from "../styles/Containers";
import { FormStyle, LabelStyle, TextInputStyle } from "../styles/Forms";
import { SectionHeadingStyle, SimplePStyle } from "../styles/Typography";
import { DELETE_PLANT, GET_ALL_PLANTS } from "../../gql";
import { navigate } from "@reach/router";
import { Error } from "../Global";

export const DeletePlant = ({ id, plantName, toggle }) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const handleCompleted = () => {
    navigate("/plants/");
  };

  const [deletePlant, { error }] = useMutation(DELETE_PLANT, {
    refetchQueries: { query: GET_ALL_PLANTS },
    onCompleted: handleCompleted,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    deletePlant({ variables: { id } });
  };

  return (
    <FlexContainer flexDirection="column">
      <SectionHeadingStyle
        centerText
      >{`Delete ${plantName}`}</SectionHeadingStyle>
      {error && <Error message={error.message} />}
      <FormStyle onSubmit={(e) => handleSubmit(e)}>
        <SimplePStyle>{`This cannot be undone.`}</SimplePStyle>
        <SimplePStyle>
          Type <span style={{ color: "var(--red)" }}>{plantName}</span> in the
          box below and press the DELETE button.
        </SimplePStyle>
        <div>
          <LabelStyle hidden htmlFor="delete-confirmation">
            Delete Name Confirmation
          </LabelStyle>
          <TextInputStyle
            name="delete-confirmation"
            value={deleteConfirmation}
            onChange={(e) => setDeleteConfirmation(e.target.value)}
          />
        </div>
        <PrimaryButton
          type="submit"
          as="input"
          delete
          disabled={deleteConfirmation !== plantName}
          value="Delete"
          fullwidth
        />
        <NoBorderButton onClick={toggle} fullwidth>
          Cancel
        </NoBorderButton>
      </FormStyle>
    </FlexContainer>
  );
};
