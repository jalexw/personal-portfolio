"use client";

import { useCallback } from "react";
import type { GLTF } from "@/lib/GLTF";
import type { SkinnedMesh, Material } from "three";

type GLTF_Opacity_Setter = (gltf: GLTF, newOpacity: number) => void;

export function useUpdateOpacity(): GLTF_Opacity_Setter {
  const setter: GLTF_Opacity_Setter = useCallback(
    (gltf: GLTF, newOpacity: number) => {
      gltf.scene.traverse((object) => {
        const type = object.type.toUpperCase();
        if (type === "MESH" || type === "SKINNEDMESH") {
          if (
            !object.hasOwnProperty("isMesh") ||
            !(object as SkinnedMesh).isMesh
          ) {
            throw new Error("Object with type == Mesh but isMesh == false");
          }
          const mesh = object as SkinnedMesh;
          const material: Material[] = Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material];
          material.forEach((mat): void => {
            if (newOpacity === 1) {
              mat.transparent = false;
              mat.opacity = 1;
              return;
            }
            mat.transparent = true;
            if (process.env.NODE_ENV === "development") {
              console.assert(newOpacity >= 0 && newOpacity <= 1);
            }
            mat.opacity = newOpacity;
          });
        }
      });
    },
    [],
  );
  return setter;
}

export default useUpdateOpacity;
