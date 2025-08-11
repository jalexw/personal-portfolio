"use client";

import { CameraShake, PerspectiveCamera } from "@react-three/drei";
import { useRef, type ReactElement } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import Avatar from "./avatar";
import { Vector3 } from "three";
import type { TAvatarRef, TAvatarRefData } from "./TAvatarRef";
import useCursorCameraMovementEffect from "./useCursorCameraMovementEffect";

const cameraShakeConfig: Parameters<typeof CameraShake>[0] = {
  maxYaw: 0.02 as const,
  maxPitch: 0.02 as const,
  maxRoll: 0.02 as const,
};

export function Scene(): ReactElement {
  const avatarRef: TAvatarRef = useRef<TAvatarRefData>(null);

  const prefersReducedMotion: boolean = usePrefersReducedMotion();

  useCursorCameraMovementEffect({ avatarRef });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.8, 5]} />

      <Avatar ref={avatarRef} position={new Vector3(0, 0, 0)} />

      <pointLight intensity={90} position={[0, 5, 5]} />
      <ambientLight intensity={0.4} />

      {!prefersReducedMotion && <CameraShake {...cameraShakeConfig} />}
    </>
  );
}
