import React from "react";
import { FlexContainer } from "../styles/Containers";
import { LoadingStyle } from "../styles/Loading";

export const Loading = () => {
  return (
    <FlexContainer>
      <LoadingStyle
        animate={{
          scale: [0.25, 0.8, 0.25],
          rotate: [0, 180, 360],
          borderRadius: ["50%", "20%", "50%"],
        }}
        transition={{
          duration: 2,
          type: "spring",
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Infinity,
          repeatDelay: 0.2,
        }}
      />
    </FlexContainer>
  );
};
