"use client";

import { type ExperienceLoadingCategories } from "./context";
import { useExperience } from "./use-experience";

export function useExperienceReady(
  loadingCategorySelector?: ExperienceLoadingCategories | ExperienceLoadingCategories[]
): boolean {
  const experience = useExperience();
  const loadingStates: Record<ExperienceLoadingCategories, boolean> = experience.loadingStates;

  if (typeof loadingCategorySelector === 'string') { // Then, this hook is being used to check status of a specific category
    return loadingStates[loadingCategorySelector] satisfies boolean;
  } else if (Array.isArray(loadingCategorySelector)) { // Check if the specified loading categories are ready
    const specifiedCategoriesReady: boolean = loadingCategorySelector.map((loadingCategory: ExperienceLoadingCategories): boolean => loadingStates[loadingCategory]).every((loadingStatus: boolean) => loadingStatus);

    return specifiedCategoriesReady;
  }

  const allCategoriesReady: boolean = Object.entries(loadingStates)
    .every(([loadingCategoryName, loadingStatusBool]: [string, boolean], index: number): boolean => {
      void loadingCategoryName;
      return loadingStatusBool
    });

  return allCategoriesReady;
}