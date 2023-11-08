"use client";

import { createContext } from "react";

export interface PortfolioExperienceLoadingState {
  loadingStates: Required<Record<'assets' | 'three', boolean>>;
}

export const PortfolioExperienceContext = createContext<PortfolioExperienceLoadingState>({
  loadingStates: {
    three: false,
    assets: false
  }
});
