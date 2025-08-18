"use client";

import { type RefObject, createContext } from "react";
import type { ExperienceManagerReducerAction } from "@/hooks/use-experience-manager-loading-states-reducer";
import type { PortfolioExperienceLoadManager } from "@/lib/portfolio-experience-load-manager";

import type { ExperienceLoadingCategories } from "@/lib/PortfolioExperienceLoadingCategories";
export type { ExperienceLoadingCategories } from "@/lib/PortfolioExperienceLoadingCategories";

export type PortfolioExperienceLoadingState = {
  loadingStates: Record<ExperienceLoadingCategories, boolean>;
  experienceLoadManager: RefObject<PortfolioExperienceLoadManager | null> | null;
  dispatch: (action: ExperienceManagerReducerAction) => void;
};

export const defaultExperienceLoadingState: PortfolioExperienceLoadingState = {
  loadingStates: {
    start_load: false,
    canvas: false,
    initial_assets: false,
    placeholder_exit: false,
    typewriter_effect_exit: false,
  },
  experienceLoadManager: null,
  dispatch: () => {
    throw new Error(
      "PortfolioExperienceContext is not being consumed before dispatch called!",
    );
  },
};

export const PortfolioExperienceContext =
  createContext<PortfolioExperienceLoadingState>(defaultExperienceLoadingState);
