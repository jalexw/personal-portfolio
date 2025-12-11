"use client";

import { useFrame } from "@react-three/fiber";
import type { TAvatarRef } from "./TAvatarRef";
import { type CursorPosition, useCursorPosition } from "./useCursorPosition";
import { calculateRelativeCursorPosition } from "./relativeCursorPosition";
import type { RefObject } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import {
  getCurrentWindowDimensions,
  useCurrentWindowDimensions,
} from "./useCurrentWindowDimensions";

// Linear interpolation
function lerp(from: number, to: number, speed: number) {
  const amount = (1 - speed) * from + speed * to;
  return Math.abs(from - to) < 0.001 ? to : amount;
}

export interface IUseCursorCameraMovementEffectOpts {
  avatarRef: TAvatarRef;
}

const mouseMovementDelay = 0.2 as const satisfies number;

export function useCursorCameraMovementEffect({
  avatarRef,
}: IUseCursorCameraMovementEffectOpts) {
  const windowSize = useCurrentWindowDimensions(getCurrentWindowDimensions());
  const prefersReducedMotion: boolean = usePrefersReducedMotion();
  const cursorPosition: RefObject<CursorPosition | undefined> =
    useCursorPosition();

  function calculateMouseEffect(relativeCursorPosition: CursorPosition): {
    x_rads: number;
    y_rads: number;
  } {
    // Amplitude = 45degrees/ 1/2pi rads
    const amplitude: number = !prefersReducedMotion ? Math.PI / 2 : Math.PI / 4;
    const xAmplitude: number = amplitude / 3;
    const yAmplitude: number = amplitude;

    const x_rads: number =
      xAmplitude / 2 - xAmplitude * relativeCursorPosition.y;
    const y_rads: number =
      yAmplitude / 2 - yAmplitude * relativeCursorPosition.x;

    return {
      x_rads,
      y_rads,
    };
  }

  useFrame(() => {
    if (!avatarRef.current) {
      return;
    }

    const relativeCursorPosition: CursorPosition =
      calculateRelativeCursorPosition(
        cursorPosition.current,
        windowSize.current,
      );

    const mouseEffect = calculateMouseEffect(relativeCursorPosition);

    // Interpolate between the current and target rotation values
    const xRotation =
      lerp(
        avatarRef.current.rotation.x,
        mouseEffect.x_rads,
        mouseMovementDelay,
      ) + 0.1;
    const yRotation = lerp(
      avatarRef.current.rotation.y,
      mouseEffect.y_rads,
      mouseMovementDelay,
    );

    avatarRef.current.rotation.x = xRotation;
    avatarRef.current.rotation.y = yRotation;
  });
}

export default useCursorCameraMovementEffect;
