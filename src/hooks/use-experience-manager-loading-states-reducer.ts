"use client";

import { useReducer } from "react";
import {
  defaultExperienceLoadingState,
  type ExperienceLoadingCategories,
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

interface StartLoadingExperienceAction extends BaseAction<"start_load"> {
  type: "start_load";
}

interface ResetExperienceAction extends BaseAction<"reset"> {
  type: "reset";
}

export type ExperienceManagerReducerAction =
  | StartLoadingExperienceAction
  | LoadCompleteAction
  | CanvasReadyAction
  | PlaceholderExitCompleteAction
  | TypewriterEffectExitCompleteAction
  | ResetExperienceAction;

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
    case "start_load":
      state.start_load = true;
      return state;
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
    case "reset":
      state.start_load = false;
      state.canvas = false;
      state.initial_assets = false;
      state.typewriter_effect_exit = false;
      state.placeholder_exit = false;
      return state;
    default:
      throw new Error(`Unhandled experience manager reducer action`);
  }
}

export function useExperienceManagerLoadingStatesReducer() {
  const [value, dispatch] = useReducer(
    experienceManagerReducer, // state + action => new state
    defaultExperienceLoadingState.loadingStates,
    (init: Record<ExperienceLoadingCategories, boolean>) => init,
  );
  return [value, dispatch] as const;
}
