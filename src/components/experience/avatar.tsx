"use client";

import {
  type ReactElement,
  type Ref,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import {
  type Vector3,
  type Object3D,
  type Object3DEventMap,
  LoopOnce,
  LoopRepeat,
  AnimationAction,
} from "three";
import {
  useExperience,
  type PortfolioExperienceLoadManager,
} from "../experience-loader";
import type { AssetRef } from "../experience-loader/asset-def";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { avatarAnimation } from "./avatar_animation";

interface AvatarComponentProps {
  position: Vector3;
}

interface AvatarComponentShowcaserProps extends AvatarComponentProps {
  gltf: GLTF;
}

function AvatarComponentShowcaser(
  { gltf, ...props }: AvatarComponentShowcaserProps,
  ref: Ref<Object3D<Object3DEventMap>>,
): ReactElement {
  const { clips, actions, mixer, ...animations } = useAnimations(
    gltf.animations,
    gltf.scene,
  );

  useFrame((state, delta) => {
    mixer.update(delta);
  });

  useEffect(function animationEffect() {
    if (animations) {
      const fallAction: AnimationAction | null = actions["Falling Idle"];
      const landAction: AnimationAction | null = actions["Falling To Landing"];
      const waveAction: AnimationAction | null = actions["Waving"];
      const idleAction: AnimationAction | null = actions["Breathing Idle"];
      const jumpingAction: AnimationAction | null = actions["Jumping Up"];

      if (
        fallAction &&
        landAction &&
        waveAction &&
        idleAction &&
        jumpingAction
      ) {
        avatarAnimation(
          fallAction,
          landAction,
          waveAction,
          idleAction,
          jumpingAction,
        );
      } else {
        console.warn("One or more required animations are missing!");
      }
    } else {
      console.warn("useAnimations is not ready!");
    }
  }, []);

  return <primitive object={gltf.scene} ref={ref} position={props.position} />;
}

const Showcaser = forwardRef(AvatarComponentShowcaser);

function AvatarComponent(
  props: AvatarComponentProps,
  ref: Ref<Object3D<Object3DEventMap>>,
): ReactElement {
  const experience = useExperience();
  const manager = experience.experienceLoadManager?.current;

  const avatarAssetRef: AssetRef<"avatar", "gltf"> | undefined =
    manager?.assets.get("avatar");

  const gltf: GLTF | undefined = avatarAssetRef?.asset;

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("AvatarComponent GLTF:", gltf);
    }
  }, [gltf]);

  if (!gltf) {
    // This component was rendered before the load manager finished loading the Avatar data
    throw new Error("Failed to load 3D Avatar GLTF data!");
  }

  return <Showcaser ref={ref} position={props.position} gltf={gltf} />;
}

export const Avatar = forwardRef(AvatarComponent);
