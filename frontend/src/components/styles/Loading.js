import { motion } from "framer-motion";
import styled from "styled-components";

export const LoadingStyle = styled(motion.div)`
  width: 200px;
  height: 200px;
  border-radius: var(--cardBorderRadius);
  background-color: var(--primary);
  position: absolute;
  top: 20;
`;
