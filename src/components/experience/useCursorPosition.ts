import { type RefObject, useRef, useEffect } from "react";

export interface CursorPosition {
  x: number;
  y: number;
}

export function useCursorPosition(): RefObject<CursorPosition | undefined> {
  const cursor = useRef<CursorPosition | undefined>(undefined);

  // Update cursor position
  useEffect(() => {
    function updateCurrentCursorPosition(x: number, y: number): void {
      cursor.current = {
        x,
        y,
      };
    }

    function handleMouseMove(event: MouseEvent): void {
      updateCurrentCursorPosition(event.clientX, event.clientY);
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  return cursor;
}
