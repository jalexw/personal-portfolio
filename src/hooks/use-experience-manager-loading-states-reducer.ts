"use client";

import { useReducer } from "react";
import {
  defaultExperienceLoadingState,
  type PortfolioExperienceLoadingState,
} from "@/contexts/portfolio-experience-loading-context";

interface BaseAction<T extends string> {
  type: T;
}

interface LoadCompleteAction extends BaseAction<"initial_assets_loaded"> {
  type: "initial_assets_loaded";
}

interface CanvasReadyAction extends BaseAction<"canvas_ready"> {
  type: "canvas_ready";
}

interface TypewriterEffectExitCompleteAction
  extends BaseAction<"typewriter_effect_exit_complete"> {
  type: "typewriter_effect_exit_complete";
}

interface PlaceholderExitCompleteAction
  extends BaseAction<"placeholder_exit_complete"> {
  type: "placeholder_exit_complete";
}

export type ExperienceManagerReducerAction =
  | LoadCompleteAction
  | CanvasReadyAction
  | PlaceholderExitCompleteAction
  | TypewriterEffectExitCompleteAction;

function experienceManagerReducer(
  state: PortfolioExperienceLoadingState["loadingStates"],
  action: ExperienceManagerReducerAction,
): PortfolioExperienceLoadingState["loadingStates"] {
  if (typeof action.type !== "string") {
    throw new Error(
      "Expected experience manager reducer action type to be a string",
    );
  }

  // state.

  switch (action.type) {
    case "canvas_ready":
      state.canvas = true;
      return state;
    case "initial_assets_loaded":
      state.initial_assets = true;
      return state;
    case "placeholder_exit_complete":
      state.placeholder_exit = true;
      return state;
    case "typewriter_effect_exit_complete":
      state.typewriter_effect_exit = true;
      return state;
    default:
      if (process.env.NODE_ENV === "development") {
        throw new Error(`Unhandled experience manager reducer action`);
      }
      return state;
  }
}

export function useExperienceManagerLoadingStatesReducer() {
  const [value, dispatch] = useReducer(
    experienceManagerReducer, // state + action => new state
    defaultExperienceLoadingState.loadingStates,
    (init) => init,
  );
  return [value, dispatch] as const;
}
