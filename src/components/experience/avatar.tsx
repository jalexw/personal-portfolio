"use client";

import { type ReactElement, useEffect, useMemo, useCallback } from "react";
import { type Vector3, type AnimationAction } from "three";
import useExperience from "@/hooks/use-experience";
import type { AssetRef } from "@/lib/experience-asset-definition";
import type { GLTF } from "@/lib/GLTF";
import { useAnimations } from "@react-three/drei";
import { type MotionValue, useScroll } from "framer-motion";
import { avatarAnimation } from "./avatar_animation";
import type { AvatarAnimationActions } from "./avatar_animation_actions";
import type { TAvatarRef } from "./TAvatarRef";
import useExperienceInteractionsState from "@/hooks/use-experience-interactions-state";
import useExperienceInteractionsStateDispatch from "@/hooks/use-experience-interactions-state-dispatch";
import useDebug from "@/hooks/useDebug";
import useUpdateAnimationMixerClock from "./useUpdateAnimationMixerClock";
import useAvatarOpacity from "./useAvatarOpacity";

const DEBUG_SCROLL_HANDLER: boolean = false;

interface AvatarComponentProps {
  position: Vector3;
  ref: TAvatarRef;
}

interface AvatarComponentShowcaserProps extends AvatarComponentProps {
  gltf: GLTF;
}

const SCROLL_THRESHOLD_VIEWPORT_HEIGHT = 25 as const satisfies number;

type UnsubscribeFn = () => void;

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
  }, [interact, debug]);

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

  useUpdateAnimationMixerClock(mixer);

  useAvatarOpacity(gltf);

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

  useEffect(
    function scrollHandlerEffect(): UnsubscribeFn {
      function handleScroll(): void {
        const scrollY: MotionValue<number> = scroll.scrollY;
        const isOverThreshold: boolean = isOverScrollThreshold(scrollY);

        if (debug && DEBUG_SCROLL_HANDLER) {
          console.groupCollapsed("[handleScroll]");
          console.log("scrollY: ", scrollY);
          console.log("isOverThreshold: ", isOverThreshold);
          console.groupEnd();
        }

        if (isOverThreshold) {
          if (typeof lastExitByJump !== "number") {
            exit();
            return;
          }

          if (
            typeof lastEntryByFall === "number" &&
            typeof lastExitByJump === "number"
          ) {
            if (lastEntryByFall > lastExitByJump) {
              exit();
              return;
            }
          }
        } else if (!isOverThreshold) {
          if (typeof lastEntryByFall !== "number") {
            enter();
            return;
          }

          if (
            typeof lastEntryByFall === "number" &&
            typeof lastExitByJump === "number"
          ) {
            if (lastEntryByFall < lastExitByJump) {
              enter();
              return;
            }
          }
        } else {
          throw new Error("Unreachable code was somehow reached 👁️👄👁️");
        }
      }

      handleScroll();

      if (debug) {
        console.log("[scrollHandlerEffect] Adding scroll listener...");
      }
      window.addEventListener("scroll", handleScroll);

      const unsubscribeScrollHandler: UnsubscribeFn = () => {
        if (debug) {
          console.log("[scrollHandlerEffect] Unsubscribing...");
        }
        window.removeEventListener("scroll", handleScroll);
      };
      return unsubscribeScrollHandler;
    },
    [
      scroll,
      avatarActions,
      lastExitByJump,
      lastEntryByFall,
      isOverScrollThreshold,
      enter,
      exit,
      debug,
    ],
  );

  useEffect(
    function animationEffect(): void | UnsubscribeFn {
      if (!avatarActions) {
        console.warn("One or more required animations are missing!");
        return;
      }
      if (typeof lastEntryByFall === "number") {
        return avatarAnimation({
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
  const debug: boolean = useDebug();
  const experience = useExperience();
  const manager = experience.experienceLoadManager?.current;

  const avatarAssetRef: AssetRef<"avatar", "gltf"> | undefined =
    manager?.assets.get("avatar");

  const gltf: GLTF | undefined = avatarAssetRef?.asset;

  useEffect(() => {
    if (debug) {
      console.log("AvatarComponent GLTF:", gltf);
    }
  }, [gltf, debug]);

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

export default Avatar;
