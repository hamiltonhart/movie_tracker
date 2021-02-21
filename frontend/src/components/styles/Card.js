import styled from "styled-components";

export const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: var(--cardBorderRadius);
  box-shadow: var(--bs);
  height: ${(props) => (props.expanded ? `242px` : `var(--cardHeight)`)};
  margin-top: 3rem;
  margin-bottom: 3rem;
`;
