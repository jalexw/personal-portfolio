import { createContext } from "react";

export type PortfolioExperienceInteractionsState = {
  withinInteractionsStateContext: boolean;
  lastEntranceTime: number | null;
  lastClickTime: number | null;
  lastExitTime: number | null;
};

const defaultPortfolioExperienceInteractionsState: PortfolioExperienceInteractionsState =
  {
    withinInteractionsStateContext: false,
    lastEntranceTime: null,
    lastClickTime: null,
    lastExitTime: null,
  };

export const PortfolioExperienceInteractionsStateContext =
  createContext<PortfolioExperienceInteractionsState>(
    defaultPortfolioExperienceInteractionsState,
  );
