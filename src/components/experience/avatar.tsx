"use client";

// import { Gltf } from "@react-three/drei";
import { type ReactElement, type Ref, forwardRef } from "react";
import { type Vector3, type Object3D, type Object3DEventMap } from "three";
import { useExperience } from "../experience-loader";
// import type { PortfolioExperienceLoadManager } from "../experience-loader/load-manager";
import type { AssetRef } from "../experience-loader/asset-def";

interface AvatarComponentProps {
  position: Vector3
}

function AvatarComponent(props: AvatarComponentProps, ref: Ref<Object3D<Object3DEventMap>>): ReactElement {
  const experience = useExperience();

  const avatarAssetRef: AssetRef<'avatar', 'gltf'> | undefined = experience.experienceLoadManager?.current?.assets.get("avatar");
  if (!avatarAssetRef) {
    return <></>
  }

  const gltf = avatarAssetRef.asset
  
  return (
    <primitive
      object={gltf.scene}
      ref={ref}
      position={props.position}
    />
  );
}

export const Avatar = forwardRef(AvatarComponent);
