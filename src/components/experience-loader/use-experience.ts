import { useContext } from "react";
import { PortfolioExperienceContext, type PortfolioExperienceLoadingState } from "./context";

export function useExperience(): PortfolioExperienceLoadingState {
  return useContext(PortfolioExperienceContext);
}
