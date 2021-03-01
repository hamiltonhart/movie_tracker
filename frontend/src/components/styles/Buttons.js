import styled from "styled-components";

export const Button = styled.button`
  padding: ${(props) =>
    props.size === "large" ? `var(--lgBtnSpacing)` : `var(--smBtnSpacing)`};
  border-radius: var(--cardBorderRadius);
  font-size: ${(props) =>
    props.size === "large" ? `var(--bitMore)` : `var(--normal)`};
  font-weight: 600;
  text-align: center;
  ${(props) => props.fullwidth && `width: 100%`}
`;

export const PrimaryButton = styled(Button)`
  background-color: ${(props) =>
    props.delete ? `var(--red)` : `var(--primary)`};
  color: ${(props) =>
    props.delete ? `var(--redContrast)` : `var(--primaryContrast)`};
  &:visited {
    &:visited {
      color: var(--primaryContrast);
    }
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: ${(props) =>
    props.delete ? `var(--redContrast)` : `var(--primaryContrast)`};
  color: ${(props) => (props.delete ? `var(--red)` : `var(--primary)`)};
  &:visited {
    color: var(--primary);
  }
`;

export const NoBorderButton = styled(Button)`
  color: var(--primary);
  background: none;
  &:visited {
    color: var(--primary);
  }
`;
