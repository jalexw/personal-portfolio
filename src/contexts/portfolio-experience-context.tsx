"use client";

import { type RefObject, createContext } from "react";
import type { ExperienceManagerReducerAction } from "@/hooks/use-experience-manager-loading-states-reducer";
import { PortfolioExperienceLoadManager } from "@/lib/portfolio-experience-load-manager";

export type ExperienceLoadingCategories =
  | "canvas"
  | "initial_assets"
  | "placeholder_exit"
  | "typewriter_effect_exit";

export type PortfolioExperienceLoadingState = {
  loadingStates: Record<ExperienceLoadingCategories, boolean>;
  experienceLoadManager: RefObject<PortfolioExperienceLoadManager | null> | null;
  dispatch: (action: ExperienceManagerReducerAction) => void;
};

export const defaultExperienceLoadingState: PortfolioExperienceLoadingState = {
  loadingStates: {
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
