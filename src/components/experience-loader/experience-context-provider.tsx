"use client";

import {
  type PropsWithChildren,
  type ReactElement,
  useEffect,
  useTransition,
  useRef,
  useCallback,
  useMemo,
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
import useDebug from "@/hooks/useDebug";

export function PortfolioExperienceProvider({
  children,
}: PropsWithChildren): ReactElement {
  const debug: boolean = useDebug();
  const [value, dispatchSync] = useExperienceManagerLoadingStatesReducer();
  const [isDispatching, startDispatching] = useTransition();

  const dispatch = useCallback(
    (action: ExperienceManagerReducerAction) => {
      startDispatching(() => {
        dispatchSync(action);
      });
    },
    [startDispatching, dispatchSync],
  );

  const experienceManagerRef = useRef<PortfolioExperienceLoadManager | null>(
    null,
  );

  useEffect(() => {
    if (!value.start_load) {
      if (debug) {
        console.log("[PortfolioExperienceProvider] Loading experience...");
      }
      experienceManagerRef.current = null;
      dispatch({
        type: "start_load",
      });
      return;
    } else {
      if (debug) {
        console.log(
          "[PortfolioExperienceProvider] 'start_load' event started!",
        );
      }
    }

    let cancelHandler: boolean = false;

    async function init(): Promise<void> {
      if (cancelHandler) {
        if (debug) {
          console.log(
            "[PortfolioExperienceProvider] Cancelling init() effect due to unmount/unsubscribe...",
          );
        }
        return;
      }

      if (!experienceManagerRef.current) {
        if (debug) {
          console.log(
            "[PortfolioExperienceProvider] Initializing PortfolioExperienceLoadManager...",
          );
        }
        const experienceManager = new PortfolioExperienceLoadManager(
          experienceAssetDefinitions,
          debug,
        );
        experienceManagerRef.current = experienceManager;
        await experienceManagerRef.current.loadInitialAssets();
        dispatch({
          type: "initial_assets_loaded",
        });
      } else {
        if (debug) {
          console.log(
            "[PortfolioExperienceProvider] Portfolio experience manager already initialized...",
          );
        }
      }
    }

    init().then(() => {
      if (debug) {
        console.log("[PortfolioExperienceProvider] init() finished running!");
      }
    });

    const unsubscribe = (): void => {
      cancelHandler = true;
    };

    return unsubscribe;
  }, [dispatch, debug, value.start_load]);

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
