"use client";

import { Gltf } from "@react-three/drei";
import { type ReactElement, type Ref, forwardRef } from "react";
import { type Vector3, type Object3D, type Object3DEventMap } from "three";
import { useExperience } from "../experience-loader";
import type { PortfolioExperienceLoadManager } from "../experience-loader/load-manager";
import { AssetRef } from "../experience-loader/asset-def";

interface PenguinComponentProps {
  position: Vector3
}

function PenguinComponent(props: PenguinComponentProps, ref: Ref<Object3D<Object3DEventMap>>): ReactElement {
  // if (process.env.NODE_ENV === 'development') {
  //   console.log("Rendering Gltf model \"Penguin\"");
  // }

  const experience = useExperience();

  const penguinAssetRef: AssetRef<'penguin', 'gltf'> | undefined = experience.experienceLoadManager?.current?.assets.get("penguin");
  if (!penguinAssetRef) {
    return <></>
  }

  const gltf = penguinAssetRef.asset
  
  // const children = gltf.scene.children
  // console.log(children);
  // const penguin = children.

  return <primitive object={gltf.scene} ref={ref} position={props.position} />
}

export const Penguin = forwardRef(PenguinComponent);
