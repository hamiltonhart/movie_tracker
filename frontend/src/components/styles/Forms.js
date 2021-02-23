import styled from "styled-components";

export const FormStyle = styled.form`
  display: "flex";
  flex-direction: "column";
  justify-content: "center";
  align-items: "center";
  margin-top: 1.6rem;
  margin-bottom: 1.6rem;
  & > * {
    margin-bottom: ${(props) =>
      props.itemSpacing ? props.itemSpacing : `1.6rem`};
  }
`;

export const TextInputStyle = styled.input.attrs({
  type: "text",
})`
  border: 2px solid var(--lightGray);
  border-radius: var(--cardBorderRadius);
  width: ${(props) => (props.width ? props.width : `100%`)};
  padding: 1.6rem 1.6rem;
  background-color: var(--lightGrey);
  font-size: 1.6rem;
  &:focus {
    border: solid 2px var(--primary);
  }
`;

export const TextareaInputStyle = styled.textarea`
  border: 2px solid var(--lightGray);
  border-radius: var(--cardBorderRadius);
  width: ${(props) => (props.width ? props.width : `100%`)};
  padding: 1.6rem 1.6rem;
  background-color: var(--lightGrey);
  font-size: 1.6rem;
  resize: none;
  &:focus {
    border: solid 2px var(--primary);
  }
`;
