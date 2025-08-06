"use client";

import {
  type PropsWithChildren,
  type ReactElement,
  useEffect,
  useTransition,
  useRef,
} from "react";
import {
  PortfolioExperienceContext,
  type PortfolioExperienceLoadingState,
} from "@/contexts/portfolio-experience-loading-context";
import {
  type ExperienceManagerReducerAction,
  useExperienceManagerLoadingStatesReducer,
} from "@/hooks/use-experience-manager-loading-states-reducer";
import { PortfolioExperienceLoadManager } from "@/lib/portfolio-experience-load-manager";
import { experienceAssetDefinitions } from "@/lib/experience-asset-definitions";

export function PortfolioExperienceProvider({
  children,
}: PropsWithChildren): ReactElement {
  const [value, dispatchSync] = useExperienceManagerLoadingStatesReducer();
  const [isDispatching, startDispatching] = useTransition();

  const dispatch = (action: ExperienceManagerReducerAction) => {
    startDispatching(() => {
      dispatchSync(action);
    });
  };

  const experienceManagerRef = useRef<PortfolioExperienceLoadManager | null>(
    null,
  );

  useEffect(() => {
    async function init() {
      if (!experienceManagerRef.current) {
        if (process.env.NODE_ENV === "development") {
          console.log(
            "[PortfolioExperienceProvider] Initializing PortfolioExperienceLoadManager...",
          );
        }
        const experienceManager = new PortfolioExperienceLoadManager(
          experienceAssetDefinitions,
        );
        experienceManagerRef.current = experienceManager;
        await experienceManagerRef.current.loadInitialAssets();
        dispatch({
          type: "initial_assets_loaded",
        });
      } else {
        if (process.env.NODE_ENV === "development") {
          console.log("Portfolio experience manager already initialized...");
        }
      }
    }
    init();
  }, []);

  return (
    <PortfolioExperienceContext.Provider
      value={
        {
          experienceLoadManager: experienceManagerRef,
          dispatch,
          loadingStates: value,
        } satisfies PortfolioExperienceLoadingState
      }
    >
      {children}
    </PortfolioExperienceContext.Provider>
  );
}
