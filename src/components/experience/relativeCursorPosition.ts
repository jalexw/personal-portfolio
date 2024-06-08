import { WindowDimensions } from "./useCurrentWindowDimensions";
import { CursorPosition } from "./useCursorPosition";

export function calculateRelativeCursorPosition(absolutePosition: CursorPosition | undefined, windowDimensions: WindowDimensions): CursorPosition {
  if (!absolutePosition) {
    return { x: 0.5, y: 0.5 }; // treat as middle of screen if not defined
  }

  return {
    x: Math.min(absolutePosition.x / windowDimensions.width, 1),
    y: Math.min(absolutePosition.y / windowDimensions.height, 1)
  };
}
