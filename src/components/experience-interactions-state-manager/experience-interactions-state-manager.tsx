"use client";

import {
  type PortfolioExperienceInteractionsState,
  PortfolioExperienceInteractionsStateContext,
} from "@/contexts/portfolio-experience-interactions-state-context";
import {
  ActionDispatch,
  type PropsWithChildren,
  type ReactElement,
  useReducer,
} from "react";
import portfolioExperienceInteractionsStateReducer, {
  type PortfolioExperienceInteractionsStateReducerAction,
} from "@/lib/experience-interactions-state-reducer";
import { PortfolioExperienceInteractionsStateDispatchContext } from "@/contexts/portfolio-experience-interactions-state-dispatch-context";

export interface ExperienceInteractionsStateManagerProps
  extends PropsWithChildren {}

export function ExperienceInteractionsStateManager({
  children,
}: ExperienceInteractionsStateManagerProps): ReactElement {
  const [state, dispatch] = useReducer<
    PortfolioExperienceInteractionsState,
    [action: PortfolioExperienceInteractionsStateReducerAction]
  >(portfolioExperienceInteractionsStateReducer, {
    withinInteractionsStateContext: true,
    lastClickTime: null,
    lastEntranceTime: null,
    lastExitTime: null,
  });

  return (
    <PortfolioExperienceInteractionsStateDispatchContext.Provider
      value={
        dispatch satisfies ActionDispatch<
          [action: PortfolioExperienceInteractionsStateReducerAction]
        >
      }
    >
      <PortfolioExperienceInteractionsStateContext.Provider
        value={state satisfies PortfolioExperienceInteractionsState}
      >
        {children}
      </PortfolioExperienceInteractionsStateContext.Provider>
    </PortfolioExperienceInteractionsStateDispatchContext.Provider>
  );
}

export default ExperienceInteractionsStateManager;
