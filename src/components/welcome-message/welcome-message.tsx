"use client";

import { type ReactElement } from "react";
import useExperienceReady from "@/hooks/use-experience-ready";
import { TypewriterEffect, AnimatePresence } from "@schemavaults/ui";
import { BlurredBackgroundColors } from "./blurred-background-colors";
import { duration } from "./exit-duration";
import useExperience from "@/hooks/use-experience";

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
  if (process.env.NODE_ENV === "development") {
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
            console.log(
              "[WelcomeMessage] Typewriter Effect onComplete event: ",
              event,
            );
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
