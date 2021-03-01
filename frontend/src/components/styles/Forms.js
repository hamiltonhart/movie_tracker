import styled from "styled-components";

export const FormStyle = styled.form`
  display: "flex";
  flex-direction: "column";
  justify-content: "center";
  align-items: "center";
  margin-top: var(--medSpacing);
  margin-bottom: var(--medSpacing);
  & > * {
    margin-bottom: ${(props) =>
      props.itemSpacing ? props.itemSpacing : `var(--medSpacing)`};
  }
`;

export const TextInputStyle = styled.input`
  border: 2px solid var(--lightGray);
  border-radius: var(--cardBorderRadius);
  width: ${(props) => (props.width ? props.width : `100%`)};
  padding: 1.6rem 1.6rem;
  background-color: var(--lightGrey);
  font-size: var(--normal);
  &:focus {
    border: solid 2px var(--primary);
  }
`;

export const TextareaInputStyle = styled.textarea`
  border: 2px solid var(--lightGray);
  border-radius: var(--cardBorderRadius);
  width: ${(props) => (props.width ? props.width : `100%`)};
  padding: var(--medSpacing);
  background-color: var(--lightGrey);
  font-size: var(--normal);
  resize: none;
  &:focus {
    border: solid 2px var(--primary);
  }
`;

export const LabelStyle = styled.label`
  ${(props) => props.hidden && "display: none;"}
`;
