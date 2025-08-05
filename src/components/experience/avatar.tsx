"use client";

import {
  type ReactElement,
  type Ref,
  forwardRef,
  useEffect,
  useRef,
  useMemo,
  useState,
} from "react";
import {
  type Vector3,
  type Object3D,
  type Object3DEventMap,
  LoopOnce,
  LoopRepeat,
  AnimationAction,
  SkinnedMesh,
  Material,
} from "three";
import useExperience from "@/hooks/use-experience";
import type { AssetRef } from "@/lib/experience-asset-definition";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useAnimations } from "@react-three/drei";
import { type MotionValue, useScroll } from "framer-motion";
import { useFrame } from "@react-three/fiber";
import { avatarAnimation } from "./avatar_animation";
import type { AvatarAnimationActions } from "./avatar_animation_actions";
import type { TAvatarRef } from "./TAvatarRef";

interface AvatarComponentProps {
  position: Vector3;
  ref: TAvatarRef;
}

interface AvatarComponentShowcaserProps extends AvatarComponentProps {
  gltf: GLTF;
}

function AvatarComponentShowcaser({
  gltf,
  ...props
}: AvatarComponentShowcaserProps): ReactElement {
  const [lastEntryByFall, setLastEntryByFall] = useState<number>(Date.now());
  const [lastExitByJump, setLastExitByJump] = useState<number | null>(null);

  const scroll = useScroll();

  const { clips, actions, mixer, ...animations } = useAnimations(
    gltf.animations,
    gltf.scene,
  );

  const avatarActions: AvatarAnimationActions | null = useMemo(() => {
    if (!actions || typeof actions !== "object") return null;

    const fallAction: AnimationAction | null = actions["Falling Idle"];
    const landAction: AnimationAction | null = actions["Falling To Landing"];
    const waveAction: AnimationAction | null = actions["Waving"];
    const idleAction: AnimationAction | null = actions["Breathing Idle"];
    const jumpingAction: AnimationAction | null = actions["Jumping Up"];

    if (fallAction && landAction && waveAction && idleAction && jumpingAction) {
      return {
        fallAction,
        landAction,
        waveAction,
        idleAction,
        jumpingAction,
      };
    }
    console.error("Failed to load all animation actions for avatar!");
    return null;
  }, [actions]);

  useFrame((state, delta) => {
    if (!state.clock.running) {
      state.clock.start();
    }
    mixer.update(delta);

    function updateOpacity(newOpacity: number): void {
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
    }

    updateOpacity(1);
  });

  useEffect(() => {
    const handleScroll = () => {
      const offset: MotionValue<number> = scroll.scrollY;
      const windowHeight = window.innerHeight;
      if (typeof offset === "object") {
        const currentY: number = offset.get();
        const scrollPositionVH = (currentY / windowHeight) * 100;
        const isOverThreshold = scrollPositionVH > 25;

        if (isOverThreshold && typeof lastExitByJump !== "number") {
          const latestExitStart = Date.now();
          // Trigger jump and fade-out animations if it's not already triggered
          setLastExitByJump(latestExitStart);
          // Trigger animation logic or dispatch actions as needed
          if (process.env.NODE_ENV === "development") {
            console.log("Last exit by jump: ", latestExitStart);
          }
        } else if (!isOverThreshold && typeof lastExitByJump === "number") {
          // Reset jump status if back within threshold
          setLastExitByJump(null);
          setLastEntryByFall(Date.now());
        }
      } else {
        if (process.env.NODE_ENV === "development") {
          console.warn(
            "[handleScroll] Scroll offset is not an object:",
            offset,
          );
        }
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scroll, avatarActions, lastExitByJump]);

  useEffect(
    function animationEffect(): void {
      if (avatarActions) {
        avatarAnimation({
          ...avatarActions,
          lastEntryByFall,
          lastExitByJump,
        });
      } else {
        console.warn("One or more required animations are missing!");
      }
    },
    [lastExitByJump, lastEntryByFall, avatarActions],
  );

  return (
    <primitive object={gltf.scene} ref={props.ref} position={props.position} />
  );
}

function AvatarComponent(props: AvatarComponentProps): ReactElement {
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

  return (
    <AvatarComponentShowcaser
      ref={props.ref}
      position={props.position}
      gltf={gltf}
    />
  );
}

export const Avatar = AvatarComponent;
