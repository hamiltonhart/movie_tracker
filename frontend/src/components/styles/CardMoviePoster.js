import { motion } from "framer-motion";
import styled from "styled-components";

export const CardMoviePoster = styled(motion.img)`
  /* height: var(--cardHeight); */
  border-top-left-radius: var(--cardBorderRadius);
  display: inline-block;
`;

export const MoviePosterStyle = styled(motion.img)`
  border-radius: var(--cardBorderRadius);
  justify-self: center;
`;
