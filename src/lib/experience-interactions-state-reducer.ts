import type { PortfolioExperienceInteractionsState } from "@/contexts/portfolio-experience-interactions-state-context";

type SetLastClickAction = {
  type: "setLastClick";
  timestamp: number;
};

export type PortfolioExperienceInteractionsStateReducerAction =
  SetLastClickAction;

export function portfolioExperienceInteractionsStateReducer(
  state: PortfolioExperienceInteractionsState,
  action: PortfolioExperienceInteractionsStateReducerAction,
): PortfolioExperienceInteractionsState {
  switch (action.type) {
    case "setLastClick":
      return {
        ...state,
        lastClickTime: action.timestamp,
      };
    default:
      throw new Error(
        "Unhandled reducer action for portfolioExperienceInteractionsStateReducer!",
      );
  }
}

export default portfolioExperienceInteractionsStateReducer;
