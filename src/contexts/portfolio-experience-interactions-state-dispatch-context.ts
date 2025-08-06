import type { PortfolioExperienceInteractionsStateReducerAction } from "@/lib/experience-interactions-state-reducer";
import { type ActionDispatch, createContext } from "react";

export const PortfolioExperienceInteractionsStateDispatchContext =
  createContext<
    ActionDispatch<[action: PortfolioExperienceInteractionsStateReducerAction]>
  >(() => {
    throw new Error(
      "Not within a <PortfolioExperienceInteractionsStateDispatchContext.Provider> render tree!",
    );
  });
