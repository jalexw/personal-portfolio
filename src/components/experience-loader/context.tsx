"use client";

import { type MutableRefObject, createContext } from "react";
import type { ExperienceManagerReducerAction } from "./use-experience-manager-loading-states";
import { PortfolioExperienceLoadManager } from "./load-manager";

export type ExperienceLoadingCategories = 'canvas' | 'initial_assets';

export type PortfolioExperienceLoadingState = {
  loadingStates: Record<ExperienceLoadingCategories, boolean>;
  experienceLoadManager: MutableRefObject<PortfolioExperienceLoadManager | null> | null;
  dispatch: (action: ExperienceManagerReducerAction) => void;
}

export const defaultExperienceLoadingState: PortfolioExperienceLoadingState = {
  loadingStates: {
    canvas: false,
    initial_assets: false
  },
  experienceLoadManager: null,
  dispatch: () => {
    throw new Error("PortfolioExperienceContext is not being consumed before dispatch called!")
  }
}

export const PortfolioExperienceContext = createContext<PortfolioExperienceLoadingState>(defaultExperienceLoadingState);
