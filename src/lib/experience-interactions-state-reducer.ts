import type { PortfolioExperienceInteractionsState } from "@/contexts/portfolio-experience-interactions-state-context";

type SetLastClickAction = {
  type: "click";
  timestamp: number;
};

type StartExitAction = {
  type: "exit";
  timestamp: number;
};

type StartEntranceAction = {
  type: "enter";
  timestamp: number;
};

export type PortfolioExperienceInteractionsStateReducerAction =
  | SetLastClickAction
  | StartExitAction
  | StartEntranceAction;

export function portfolioExperienceInteractionsStateReducer(
  state: PortfolioExperienceInteractionsState,
  action: PortfolioExperienceInteractionsStateReducerAction,
): PortfolioExperienceInteractionsState {
  switch (action.type) {
    case "click":
      return {
        ...state,
        lastClickTime: action.timestamp,
      };
    case "enter":
      return {
        ...state,
        lastEntranceTime: action.timestamp,
      };
    case "exit":
      return {
        ...state,
        lastExitTime: action.timestamp,
      };
    default:
      throw new Error(
        "Unhandled reducer action for portfolioExperienceInteractionsStateReducer!",
      );
  }
}

export default portfolioExperienceInteractionsStateReducer;
