import styled from "styled-components";

export const Button = styled.button`
  padding: ${(props) =>
    props.size === "large" ? `var(--lgBtnSpacing)` : `var(--smBtnSpacing)`};
  border-radius: var(--cardBorderRadius);
  font-size: ${(props) =>
    props.size === "large" ? `var(--bitMore)` : `var(--normal)`};
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  ${(props) => props.fullwidth && `width: 100%;`}
  ${(props) => props.margin && `margin: ${props.margin};`}
`;

export const PrimaryButton = styled(Button)`
  background-color: ${(props) =>
    props.delete ? `var(--red)` : `var(--primary)`};
  background-color: ${(props) => props.disabled && `var(--grey)`};
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
  padding-left: var(--xsSpacing);
  padding-right: var(--xsSpacing);
  &:visited {
    color: var(--primary);
  }
`;

export const CloseButtonStyle = styled.button`
  display: inline-block;
  border-radius: 50%;
  /* padding: var(--xsSpacing); */
  background-color: var(--lightGray);
  width: 3.2rem;
  height: 3.2rem;
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
`;

export const IconButtonStyle = styled.button`
  padding: 0.5rem;
  border: none;
  border-radius: 50%;
  background-color: unset;
  cursor: pointer;
  img {
    width: 20px;
    height: 20px;
  }
`;
