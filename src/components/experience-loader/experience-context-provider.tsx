"use client";

import { loadFramerMotionFeatures } from "@/lib/lazy-framer";
import { LazyMotion } from "framer-motion";
import {
  useState,
  type PropsWithChildren,
  type ReactElement,
  useEffect,
  useTransition,
  useRef,
} from "react";
import {
  PortfolioExperienceContext,
  type PortfolioExperienceLoadingState,
} from "./context";
import {
  type ExperienceManagerReducerAction,
  useExperienceManagerLoadingStatesReducer,
} from "./use-experience-manager-loading-states";
import { PortfolioExperienceLoadManager } from "./load-manager";
import { experienceAssetDefinitions } from "./experience-asset-definitions";

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
  });

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("[PortfolioExperienceProvider] Setting up experience...");
    }
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
      <LazyMotion features={loadFramerMotionFeatures} strict>
        {children}
      </LazyMotion>
    </PortfolioExperienceContext.Provider>
  );
}
