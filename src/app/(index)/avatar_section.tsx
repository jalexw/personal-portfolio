"use client";

import type { ReactElement } from "react";

import { DynamicExperience } from "@/components/experience";
import useExperience from "@/hooks/use-experience";
import { HeaderBar } from "@/components/header";
import { WelcomeMessage } from "@/components/welcome-message";
import { AnimatePresence } from "@schemavaults/ui";
import useDebug from "@/hooks/useDebug";

export function AvatarSection(): ReactElement {
  const debug: boolean = useDebug();
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
    <section className="h-full w-full overflow-hidden">
      <div
        id="dom-content"
        className="w-full h-[100vh] z-10 flex flex-col justify-start items-center overflow-y-scroll overflow-x-hidden"
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
      </div>

      <AnimatePresence>
        <DynamicExperience
          key="dynamic-jalexw-portfolio-experience"
          onReady={onCanvasReady}
        />
      </AnimatePresence>
    </section>
  );
}
