"use client";

import { useContext } from "react";
import { PortfolioExperienceContext, type PortfolioExperienceLoadingState } from "./context";

export function useExperienceLoaderState(): PortfolioExperienceLoadingState {
  return useContext(PortfolioExperienceContext);
}

export function useExperienceReady(): boolean {
  const state = useExperienceLoaderState();
  return Object.values(state.loadingStates).every((value) => value);
}
