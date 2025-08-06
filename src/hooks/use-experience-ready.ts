"use client";

import useDebug from "@/hooks/useDebug";
import { type ExperienceLoadingCategories } from "@/contexts/portfolio-experience-loading-context";
import useExperience from "@/hooks/use-experience";

/**
 *
 * @param loadingCategorySelector The ID or a list of IDs of 'events'/'things' that must be loaded before useExperienceReady returns true
 * @param callerLabel An optional label for debug messages to indicate where the hook is being called from!
 * @returns True if all of the loading categories in the selector (first argument) are ready. If no selector is supplied, true if every possible category is ready!
 * @see useExperience
 */
export function useExperienceReady(
  loadingCategorySelector?:
    | ExperienceLoadingCategories
    | ExperienceLoadingCategories[],
  callerLabel?: string,
): boolean {
  const debug: boolean = useDebug();
  const experience = useExperience();
  const loadingStates: Record<ExperienceLoadingCategories, boolean> =
    experience.loadingStates;

  const debugLogLocationLabel: string = `[useExperienceReady${callerLabel ? `::<${callerLabel}>` : ""}]`;

  if (typeof loadingCategorySelector === "string") {
    // Then, this hook is being used to check status of a specific category
    const ready: boolean = loadingStates[loadingCategorySelector];
    if (debug) {
      console.log(
        debugLogLocationLabel +
          ` ${loadingCategorySelector} = ${ready ? "Ready!" : "Not ready..."}`,
      );
    }
    return ready satisfies boolean;
  } else if (Array.isArray(loadingCategorySelector)) {
    // Check if the specified loading categories are ready
    const specifiedCategoriesReady: boolean = loadingCategorySelector
      .map(
        (loadingCategory: ExperienceLoadingCategories): boolean =>
          loadingStates[loadingCategory],
      )
      .every((loadingStatus: boolean) => loadingStatus);

    if (debug) {
      console.groupCollapsed(
        debugLogLocationLabel +
          ` Loading states for: ${loadingCategorySelector.join(", ")}`,
      );
      const debugCategoriesLoadingState: Partial<
        Record<ExperienceLoadingCategories, boolean>
      > = {};
      loadingCategorySelector.forEach(
        (category: ExperienceLoadingCategories): void => {
          debugCategoriesLoadingState[category] = loadingStates[category];
        },
      );
      console.table(debugCategoriesLoadingState);
      console.groupEnd();
    }

    return specifiedCategoriesReady;
  }

  const allCategoriesReady: boolean = Object.entries(loadingStates).every(
    (
      [loadingCategoryName, loadingStatusBool]: [string, boolean],
      index: number,
    ): boolean => {
      void loadingCategoryName;
      return loadingStatusBool;
    },
  );

  return allCategoriesReady;
}

export default useExperienceReady;
