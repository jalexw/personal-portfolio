import { type RefObject, useEffect, useRef } from "react";

export interface WindowDimensions {
  width: number;
  height: number;
}

export function getCurrentWindowDimensions(): WindowDimensions {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export function useCurrentWindowDimensions(
  initialWindowSize: WindowDimensions,
): RefObject<WindowDimensions> {
  const windowSize = useRef<WindowDimensions>(initialWindowSize);

  // Update current window dimensions
  useEffect(() => {
    function updateCurrentWindowDimensions(): void {
      windowSize.current = getCurrentWindowDimensions();
    }

    window.addEventListener("resize", updateCurrentWindowDimensions);

    return () => {
      window.removeEventListener("resize", updateCurrentWindowDimensions);
    };
  });

  return windowSize;
}
