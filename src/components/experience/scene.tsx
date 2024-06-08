"use client";

import { PerspectiveCamera, useCursor } from "@react-three/drei";
import { useEffect, useRef, type ReactElement } from "react";
import { Box } from '@react-three/drei'
import { useFrame } from "@react-three/fiber";
import { getCurrentWindowDimensions, useCurrentWindowDimensions } from "./useCurrentWindowDimensions";
import { CursorPosition, useCursorPosition } from "./useCursorPosition";
import { calculateRelativeCursorPosition } from "./relativeCursorPosition";

function calculateMouseEffect(relativeCursorPosition: CursorPosition): { x_rads: number, y_rads: number } {
  // Amplitude = 45degrees/ 1/2pi rads
  const amplitude: number = Math.PI / 2;
  
  const x_rads = (amplitude / 2) - (amplitude * relativeCursorPosition.y);
  const y_rads = (amplitude / 2) - (amplitude * relativeCursorPosition.x);

  return {
    x_rads,
    y_rads
  }
}

const mouseMovementDelay = 0.2;

// Linear interpolation
function lerp(from: number, to: number, speed: number) {
  const amount = (1 - speed) * from + speed * to
  return Math.abs(from - to) < 0.001 ? to : amount
}

export function Scene(): ReactElement {
  const cubeRef = useRef<any>()
  
  const windowSize = useCurrentWindowDimensions(getCurrentWindowDimensions());
  const cursorPosition = useCursorPosition();

  useFrame(({ clock }) => {
    if (!cubeRef.current) {
      return;
    }

    const relativeCursorPosition: CursorPosition = calculateRelativeCursorPosition(cursorPosition.current, windowSize.current)
    
    const mouseEffect = calculateMouseEffect(relativeCursorPosition);

    // Interpolate between the current and target rotation values
    const xRotation = lerp(cubeRef.current.rotation.x, mouseEffect.x_rads, mouseMovementDelay);
    const yRotation = lerp(cubeRef.current.rotation.y, mouseEffect.y_rads, mouseMovementDelay);

    cubeRef.current.rotation.x = xRotation;
    cubeRef.current.rotation.y = yRotation;
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[ 0, 0, 0 ]} />
      <Box
        position={[ 0, 0, -6 ]}
        ref={cubeRef}
      >
        <meshStandardMaterial color="red" />
      </Box>

      <pointLight intensity={90} position={[0, 5, 5]}/>
      <ambientLight intensity={0.4} />
    </>
  )
}