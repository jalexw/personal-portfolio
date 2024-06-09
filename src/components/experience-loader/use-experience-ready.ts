"use client";

import { type ExperienceLoadingCategories } from "./context";
import { useExperience } from "./use-experience";

export function useExperienceReady(): boolean {
  const state = useExperience();
  const loadingStates: Record<ExperienceLoadingCategories, boolean> = state.loadingStates;

  const isReady: boolean = Object.entries(loadingStates)
    .every(([loadingCategoryName, loadingStatusBool]: [string, boolean], index: number): boolean => {
      if (process.env.NODE_ENV === 'development' && !loadingStatusBool) {
        console.warn(`Experience not ready because \"${loadingCategoryName}\"`);
      }
      return loadingStatusBool
    });

  return isReady;
}