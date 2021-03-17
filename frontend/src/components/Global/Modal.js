import React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const ModalBackground = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--darkGrey);
  opacity: 0.9;
  height: 100vh;
  width: 100vw;
  z-index: 500;
`;

const ModalContainer = styled(motion.div)`
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
      <ModalBackground
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        exit={{ opacity: 0 }}
      />
      <ModalContainer
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ damping: 100 }}
      >
        {children}
      </ModalContainer>
    </>,
    document.body
  );
};
