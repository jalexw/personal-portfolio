"use client";

import { AnimatePresence, m } from "framer-motion";
import { type ReactElement } from "react";
import { useExperienceLoaderState, useExperienceReady } from "../experience-loader";
import { TypewriterEffectGreeting } from "./typewriter-effect-greeting";
import { BlurredBackgroundColors } from "./blurred-background-colors";

export function WelcomeMessage(): ReactElement {
  const isReady = useExperienceReady();
  
  return (
    <AnimatePresence>
      { !isReady && <BlurredBackgroundColors key="bg-colors" />}
      { !isReady && (
        <TypewriterEffectGreeting message={[ // message passed as array of characters because emojis r weird
          'H', 'e', 'y',
          ' ',
          't', 'h', 'e', 'r', 'e',
          '!',
          ' ',
          '👋'
        ]} key="welcome-message-typewriter" />
      )}
    </AnimatePresence>
  )
}