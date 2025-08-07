"use client";

import type { ReactElement } from "react";

import { DynamicExperience } from "@/components/experience";
import useExperience from "@/hooks/use-experience";
import { HeaderBar } from "@/components/header";
import { WelcomeMessage } from "@/components/welcome-message";
import { AnimatePresence, cn } from "@schemavaults/ui";
import useDebug from "@/hooks/useDebug";
import ExperienceInteractionsStateManager from "@/components/experience-interactions-state-manager";
import useExperienceInteractionsStateDispatch from "@/hooks/use-experience-interactions-state-dispatch";
import useExperienceInteractionsState from "@/hooks/use-experience-interactions-state";

function ExperienceClickCaptureElement(): ReactElement {
  const debug: boolean = useDebug();
  const interactionsDispatch = useExperienceInteractionsStateDispatch();
  return (
    <div
      id="experience-click-capture-element"
      className={cn(
        "w-full h-screen",
        "z-10",
        "absolute left-0 top-0",
        "bg-transparent",
      )}
      onClick={function onClickAvatarSection(e): void {
        e.preventDefault();
        if (debug) {
          console.log("[onClickAvatarSection] clicked!");
        }
        interactionsDispatch({
          type: "click",
          timestamp: Date.now(),
        });
      }}
    />
  );
}

export function AvatarSection(): ReactElement {
  const debug: boolean = useDebug();
  // experience loading state
  const experience = useExperience();

  if (debug) {
    console.log("[AvatarSection] rendering...");
  }

  function onCanvasReady(): void {
    if (debug) {
      console.log(
        "[onCanvasReady] Canvas is ready! Dispatching ready event...",
      );
    }
    experience.dispatch({
      type: "canvas_ready",
    });
  }

  return (
    <ExperienceInteractionsStateManager>
      <section id="avatar-section" className="h-full w-full overflow-hidden">
        <div
          id="avatar-section-dom-content"
          className="w-full h-screen z-10 flex flex-col justify-start items-center overflow-y-scroll overflow-x-hidden"
        >
          <HeaderBar />

          {!experience.loadingStates.placeholder_exit && (
            <div
              id="welcome-message-container"
              className="w-full overflow-x-hidden flex items-center justify-center z-10 min-h-[40vh]"
            >
              <WelcomeMessage />
            </div>
          )}

          {experience.loadingStates.canvas &&
            experience.loadingStates.placeholder_exit &&
            experience.loadingStates.initial_assets && (
              <ExperienceClickCaptureElement />
            )}
        </div>

        <AnimatePresence>
          <DynamicExperience
            key="dynamic-jalexw-portfolio-experience"
            onReady={onCanvasReady}
          />
        </AnimatePresence>
      </section>
    </ExperienceInteractionsStateManager>
  );
}
