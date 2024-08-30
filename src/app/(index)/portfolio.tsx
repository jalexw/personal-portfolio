"use client";

import { DynamicExperience } from "@/components/experience";
import { useExperience } from "@/components/experience-loader";
import { HeaderBar } from "@/components/header";
import { WelcomeMessage } from "@/components/welcome-message";
import { AnimatePresence } from "framer-motion";

import type { ReactElement } from "react";

export function PortfolioExperienceContent(): ReactElement {
  const experience = useExperience();

  return (
    <main>
      {/** Contains all user-interactable DOM content (like text that fades in as you scroll) */}
      <div
        id="dom-content"
        className="w-full h-full fixed top-0 left-0 z-10 flex flex-col justify-start items-center overflow-y-scroll max-w-[100vw] overflow-x-hidden"
      >
        <HeaderBar />

        <div
          id="welcome-message-container"
          className="w-full overflow-x-hidden flex items-center justify-center z-10 min-h-[40vh]"
        >
          <WelcomeMessage />
        </div>
      </div>

      <AnimatePresence>
        <DynamicExperience
          onReady={() => {
            experience.dispatch({
              type: "canvas_ready",
            });
          }}
        />
      </AnimatePresence>
    </main>
  );
}
