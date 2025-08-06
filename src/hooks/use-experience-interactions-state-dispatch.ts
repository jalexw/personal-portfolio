"use client";

import { PortfolioExperienceInteractionsStateDispatchContext } from "@/contexts/portfolio-experience-interactions-state-dispatch-context";
import type { PortfolioExperienceInteractionsStateReducerAction } from "@/lib/experience-interactions-state-reducer";
import { type ActionDispatch, useContext } from "react";

export function useExperienceInteractionsStateDispatch(): ActionDispatch<
  [action: PortfolioExperienceInteractionsStateReducerAction]
> {
  return useContext(PortfolioExperienceInteractionsStateDispatchContext);
}

export default useExperienceInteractionsStateDispatch;
