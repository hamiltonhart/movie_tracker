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
  padding-left: var(--xsSpacing);
  padding-right: var(--xsSpacing);
  cursor: pointer;
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
