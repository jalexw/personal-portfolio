"use client";

import { type ReactElement, type Ref, forwardRef } from "react";
import { type Vector3, type Object3D, type Object3DEventMap } from "three";
import {
  useExperience,
  type PortfolioExperienceLoadManager,
} from "../experience-loader";
import type { AssetRef } from "../experience-loader/asset-def";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

interface AvatarComponentProps {
  position: Vector3;
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

  if (!gltf) {
    throw new Error("Failed to load 3D Avatar GLTF data!");
  }

  return <primitive object={gltf.scene} ref={ref} position={props.position} />;
}

export const Avatar = forwardRef(AvatarComponent);
