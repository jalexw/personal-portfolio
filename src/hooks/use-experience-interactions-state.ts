"use client";

import {
  type PortfolioExperienceInteractionsState,
  PortfolioExperienceInteractionsStateContext,
} from "@/contexts/portfolio-experience-interactions-state-context";
import { useContext } from "react";

export function useExperienceInteractionsState(): PortfolioExperienceInteractionsState {
  const state = useContext(PortfolioExperienceInteractionsStateContext);
  if (!state.withinInteractionsStateContext) {
    throw new Error(
      "useExperienceInteractionsState does not appear to be within a <PortfolioExperienceInteractionsStateContext.Provider> render tree!",
    );
  }
  return state;
}

export default useExperienceInteractionsState;

export type { PortfolioExperienceInteractionsState };
