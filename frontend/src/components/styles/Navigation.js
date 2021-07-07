import styled from "styled-components";

export const NavBarStyle = styled.nav`
  position: absolute;
  z-index: 900;
  top: 0;
  right: 0;
  width: 70vw;
  height: 100vh;
  color: var(--primary);
  background-color: var(--primaryContrast);
  font-size: var(--big);
  ul {
    padding: calc(var(--xxlSpacing) * 2) var(--xlSpacing);
    li {
      padding: var(--medSpacing) 0;
      font-weight: 700;
      a {
        display: block;
      }
    }
  }
`;
