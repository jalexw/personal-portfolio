"use client";

import { AnimatePresence, m } from "framer-motion";
import { type ReactElement } from "react";
import { useExperience, useExperienceReady } from "../experience-loader";
import { TypewriterEffectGreeting } from "./typewriter-effect";
import { BlurredBackgroundColors } from "./blurred-background-colors";

export function WelcomeMessage(): ReactElement {
  const isReady: boolean = useExperienceReady(
    ['canvas', 'initial_assets']
  );
  const experience = useExperience();
  
  return (
    <AnimatePresence
      // onExitComplete={(): void => {
      //   if (process.env.NODE_ENV === 'development') {
      //     console.log("[WelcomeMessage] Firing \"placeholder_exit_complete\" event");
      //   }
      //   experience.dispatch({
      //     type: 'placeholder_exit_complete'
      //   });
      // }}
    >
      { !isReady && (
        <BlurredBackgroundColors
          key="bg-colors"
        />
      )}
      { !isReady && (
        <TypewriterEffectGreeting
          key="welcome-message-typewriter"
          message={[ // message passed as array of characters because emojis r weird
            'H', 'e', 'y',
            ' ',
            't', 'h', 'e', 'r', 'e',
            '!',
            ' ',
            '👋'
          ]}
        />
      )}
    </AnimatePresence>
  )
}