"use client";

import { CameraShake, PerspectiveCamera } from "@react-three/drei";
import { useEffect, useRef, type ReactElement } from "react";
import { Box } from '@react-three/drei'
import { useFrame } from "@react-three/fiber";
import { getCurrentWindowDimensions, useCurrentWindowDimensions } from "./useCurrentWindowDimensions";
import { CursorPosition, useCursorPosition } from "./useCursorPosition";
import { calculateRelativeCursorPosition } from "./relativeCursorPosition";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { Avatar } from "./avatar";
import { Vector3 } from "three";

const mouseMovementDelay = 0.2;

// Linear interpolation
function lerp(from: number, to: number, speed: number) {
  const amount = (1 - speed) * from + speed * to
  return Math.abs(from - to) < 0.001 ? to : amount
}

const cameraShakeConfig: Parameters<typeof CameraShake>[0] = {
  maxYaw: 0.02 as const,
  maxPitch: 0.02 as const,
  maxRoll: 0.02 as const
};

export function Scene(): ReactElement {
  const avatarRef = useRef<any>()
  
  const windowSize = useCurrentWindowDimensions(getCurrentWindowDimensions());
  const cursorPosition = useCursorPosition();

  const prefersReducedMotion: boolean = usePrefersReducedMotion();

  function calculateMouseEffect(relativeCursorPosition: CursorPosition): { x_rads: number, y_rads: number } {
    // Amplitude = 45degrees/ 1/2pi rads
    const amplitude: number = !prefersReducedMotion ? (Math.PI / 2) : (Math.PI / 4);
    const xAmplitude: number = amplitude / 3;
    const yAmplitude: number = amplitude;

    const x_rads: number = (xAmplitude / 2) - (xAmplitude * relativeCursorPosition.y);
    const y_rads: number = (yAmplitude / 2) - (yAmplitude * relativeCursorPosition.x);
  
    return {
      x_rads,
      y_rads
    }
  }

  useFrame(({ clock }) => {
    if (!avatarRef.current) {
      return;
    }

    const relativeCursorPosition: CursorPosition = calculateRelativeCursorPosition(cursorPosition.current, windowSize.current)
    
    const mouseEffect = calculateMouseEffect(relativeCursorPosition);

    // Interpolate between the current and target rotation values
    const xRotation = lerp(avatarRef.current.rotation.x, mouseEffect.x_rads, mouseMovementDelay) + 0.1;
    const yRotation = lerp(avatarRef.current.rotation.y, mouseEffect.y_rads, mouseMovementDelay);

    avatarRef.current.rotation.x = xRotation;
    avatarRef.current.rotation.y = yRotation;
  });

  return (
    <>
      {/* <PerspectiveCamera makeDefault position={[ 0, 0, 1400 ]} /> */}
      <PerspectiveCamera makeDefault position={[ 0, 0.6, 4.5 ]} />

      <Avatar ref={avatarRef} position={new Vector3(0, 0, 0)} />

      <pointLight intensity={90} position={[0, 5, 5]}/>
      <ambientLight intensity={0.4} />

      {!prefersReducedMotion && <CameraShake {...cameraShakeConfig} />}
    </>
  )
}