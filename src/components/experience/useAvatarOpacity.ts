"use client";

import useExperienceInteractionsState from "@/hooks/use-experience-interactions-state";
import { useFrame } from "@react-three/fiber";
import avatarAnimationsConstants from "./avatar_animation_constants";
import useUpdateOpacity from "./useUpdateOpacity";
import type { GLTF } from "@/lib/GLTF";
import { useCallback, useRef } from "react";
import useDebug from "@/hooks/useDebug";

const fallEntryDuration: number = avatarAnimationsConstants.fallTime;
const exitDuration: number = fallEntryDuration / 2;

function hasEntered(
  lastEntranceTime: number | null,
): lastEntranceTime is number {
  return typeof lastEntranceTime === "number";
}

function hasExited(lastExitTime: number | null): lastExitTime is number {
  return typeof lastExitTime === "number";
}

export function useAvatarOpacity(gltf: GLTF): void {
  const debug: boolean = useDebug();

  const { lastEntranceTime, lastExitTime } = useExperienceInteractionsState();
  const _updateGltfModelOpacity = useUpdateOpacity();
  const lastSetOpacityRef = useRef<number | null>(null);

  const setOpacity = useCallback(
    (gltf: GLTF, opacity: number): void => {
      if (
        typeof lastSetOpacityRef.current === "number" &&
        opacity === lastSetOpacityRef.current
      ) {
        // skip update of opacity, already set!
        return;
      }

      _updateGltfModelOpacity(gltf, opacity);
      lastSetOpacityRef.current = opacity;
    },
    [_updateGltfModelOpacity],
  );

  useFrame(({ clock }, delta: number) => {
    if (!hasEntered(lastEntranceTime)) {
      setOpacity(gltf, 0);
      return;
    }

    const now: number = Date.now();
    const timeSinceEntry: number = now - lastEntranceTime;

    function setEntranceOpacity(): void {
      const opacity: number = Math.max(
        0,
        Math.min(1, timeSinceEntry / fallEntryDuration),
      );
      setOpacity(gltf, opacity);
      return;
    }

    if (!hasExited(lastExitTime)) {
      // has started entering but not exited
      setEntranceOpacity();
      return;
    }

    console.assert(
      typeof lastEntranceTime === "number" && typeof lastExitTime === "number",
    );

    const shouldShowAvatar: boolean = lastEntranceTime >= lastExitTime;
    if (shouldShowAvatar) {
      setEntranceOpacity();
      return;
    }

    const timeSinceExit: number = now - lastExitTime;

    function setExitOpacity(): void {
      const opacity: number = Math.max(
        0,
        Math.min(1, timeSinceExit / exitDuration),
      );
      setOpacity(gltf, opacity);
      return;
    }
    setExitOpacity();
    return;
  });
}

export default useAvatarOpacity;
