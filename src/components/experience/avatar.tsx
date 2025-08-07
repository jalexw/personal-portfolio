"use client";

import {
  type ReactElement,
  type Ref,
  forwardRef,
  useEffect,
  useRef,
  useMemo,
  useState,
  useCallback,
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
import useExperienceInteractionsState from "@/hooks/use-experience-interactions-state";
import useExperienceInteractionsStateDispatch from "@/hooks/use-experience-interactions-state-dispatch";
import useDebug from "@/hooks/useDebug";

interface AvatarComponentProps {
  position: Vector3;
  ref: TAvatarRef;
}

interface AvatarComponentShowcaserProps extends AvatarComponentProps {
  gltf: GLTF;
}

const SCROLL_THRESHOLD_VIEWPORT_HEIGHT = 25 as const satisfies number;

function AvatarComponentShowcaser({
  gltf,
  ...props
}: AvatarComponentShowcaserProps): ReactElement {
  const debug: boolean = useDebug();
  const interactionsState = useExperienceInteractionsState();
  const interact = useExperienceInteractionsStateDispatch();
  const lastEntryByFall: number | null = interactionsState.lastEntranceTime;
  const lastExitByJump: number | null = interactionsState.lastExitTime;
  const lastClickTime: number | null = interactionsState.lastClickTime;

  const exit = useCallback((): void => {
    if (debug) {
      console.log("[AvatarComponentShowcaser] exit()");
    }
    interact({
      type: "exit",
      timestamp: Date.now(),
    });
  }, [interact, debug]);

  const enter = useCallback((): void => {
    if (debug) {
      console.log("[AvatarComponentShowcaser] enter()");
    }
    interact({
      type: "enter",
      timestamp: Date.now(),
    });
  }, [interact]);

  const scroll = useScroll();

  const { actions, mixer } = useAnimations(gltf.animations, gltf.scene);

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

  const isOverScrollThreshold = useCallback((scrollY: MotionValue<number>) => {
    if (typeof scrollY !== "object") {
      throw new Error("Expected scrollY to be a MotionValue object!");
    }
    const currentY: number = scrollY.get();
    const windowHeight = window.innerHeight;
    const scrollPositionVH = (currentY / windowHeight) * 100;
    const isOverThreshold: boolean =
      scrollPositionVH > SCROLL_THRESHOLD_VIEWPORT_HEIGHT;
    return isOverThreshold;
  }, []);

  useEffect(() => {
    const handleScroll = (): void => {
      const isOverThreshold: boolean = isOverScrollThreshold(scroll.scrollY);
      if (isOverThreshold) {
        if (typeof lastExitByJump !== "number") {
          exit();
          return;
        }
      } else if (!isOverThreshold) {
        if (typeof lastEntryByFall !== "number") {
          enter();
          return;
        }
      } else {
        throw new Error("Unreachable code was somehow reached 👁️👄👁️");
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scroll, avatarActions, lastExitByJump, isOverScrollThreshold]);

  useEffect(
    function animationEffect(): void {
      if (!avatarActions) {
        console.warn("One or more required animations are missing!");
        return;
      }
      if (typeof lastEntryByFall === "number") {
        avatarAnimation({
          actions: avatarActions,
          interactions: {
            lastEntryByFall,
            lastExitByJump,
            lastClickTime,
          },
          debug,
        });
      }
    },
    [
      lastExitByJump,
      lastEntryByFall,
      lastClickTime,
      avatarActions,
      exit,
      enter,
      debug,
    ],
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
