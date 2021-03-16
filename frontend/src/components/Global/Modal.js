import React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--darkGrey);
  opacity: 0.5;
  height: 100vh;
  width: 100vw;
  z-index: 500;
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 20%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1000;
`;

export const Modal = ({ children }) => {
  return createPortal(
    <>
      <ModalBackground />
      <ModalContainer>{children}</ModalContainer>
    </>,
    document.body
  );
};
