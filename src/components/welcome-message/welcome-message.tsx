"use client";

import { type ReactElement } from "react";
import useExperienceReady from "@/hooks/use-experience-ready";
import { TypewriterEffect, AnimatePresence } from "@schemavaults/ui";
import { BlurredBackgroundColors } from "./blurred-background-colors";
import { duration } from "./exit-duration";
import useExperience from "@/hooks/use-experience";
import useDebug from "@/hooks/useDebug";

const message: string[] = [
  // message passed as array of characters because emojis r weird
  "H",
  "e",
  "y",
  " ",
  "t",
  "h",
  "e",
  "r",
  "e",
  "!",
  " ",
  "👋",
];

export function WelcomeMessage(): ReactElement {
  const debug: boolean = useDebug();
  if (debug) {
    console.log("[WelcomeMessage] rendering...");
  }

  const isReady: boolean = useExperienceReady(
    ["canvas", "initial_assets"],
    "WelcomeMessage",
  );
  const experience = useExperience();

  return (
    <AnimatePresence
      initial={false}
      onExitComplete={(): void => {
        experience.dispatch({
          type: "placeholder_exit_complete",
        });
      }}
    >
      {!isReady && <BlurredBackgroundColors key="bg-colors" />}
      {!isReady && (
        <TypewriterEffect
          key="welcome-message-typewriter"
          message={message}
          duration={duration}
          onComplete={(event: "exit" | "enter"): void => {
            if (debug) {
              console.log(
                "[WelcomeMessage] Typewriter Effect onComplete event: ",
                event,
              );
            }
            if (event === "exit") {
              experience.dispatch({
                type: "typewriter_effect_exit_complete",
              });
            }
          }}
          initial={false}
          className="text-primary text-4xl"
        />
      )}
    </AnimatePresence>
  );
}

export default WelcomeMessage;
