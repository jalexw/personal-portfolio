"use client";

import { type ReactElement, type Ref, forwardRef, useEffect } from "react";
import { type Vector3, type Object3D, type Object3DEventMap } from "three";
import {
  useExperience,
  type PortfolioExperienceLoadManager,
} from "../experience-loader";
import type { AssetRef } from "../experience-loader/asset-def";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useAnimations } from "@react-three/drei";

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
  const animations = useAnimations(gltf.animations, gltf.scene);

  useEffect(() => {
    // if (process.env.NODE_ENV === "development") {
    //   console.log(
    //     "[AvatarComponentShowcaser] Running models animations side effect",
    //   );
    //   console.log("Animations: ", animations);
    // }

    if (animations) {
      const actions = animations?.actions;
      const clips = animations.clips;
      if (!!actions && Array.isArray(actions)) {
        if (process.env.NODE_ENV === "development") {
          console.log("Playing animation");
        }
        actions["Falling Idle"]?.play();
      }
    } else {
      console.warn("useAnimations is not ready!");
    }
  }, [animations]);

  return (
    <primitive
      object={gltf.scene}
      ref={animations.ref}
      position={props.position}
    />
  );
}

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

  const Showcaser = forwardRef(AvatarComponentShowcaser);
  return <Showcaser ref={ref} position={props.position} gltf={gltf} />;
}

export const Avatar = forwardRef(AvatarComponent);
