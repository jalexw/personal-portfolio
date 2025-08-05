import { useContext } from "react";
import {
  PortfolioExperienceContext,
  type PortfolioExperienceLoadingState,
} from "@/contexts/portfolio-experience-context";

export function useExperience(): PortfolioExperienceLoadingState {
  return useContext(PortfolioExperienceContext);
}

export default useExperience;
