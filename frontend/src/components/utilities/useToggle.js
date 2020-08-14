import { useState } from "react";

export const useToggle = (initial) => {
  const [isShowing, setIsShowing] = useState(initial || false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };
  return {
    isShowing,
    toggle,
  };
};
