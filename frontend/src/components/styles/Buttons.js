import styled from "styled-components";

export const Button = styled.button`
  padding: ${(props) =>
    props.size === "large" ? `1.6rem 3rem` : `1.2rem 2rem`};
  border-radius: var(--cardBorderRadius);
  font-size: ${(props) => (props.size === "large" ? `1.8rem` : `1.6rem`)};
  font-weight: 600;
  text-align: center;
  ${(props) => props.fullwidth && `width: 100%`}
`;

export const PrimaryButton = styled(Button)`
  background-color: var(--primary);
  color: var(--primaryContrast);
`;

export const SecondaryButton = styled(Button)`
  background-color: var(--primaryContrast);
  color: var(--primary);
`;

export const NoBorderButton = styled(Button)`
  color: var(--primary);
  background: none;
`;
