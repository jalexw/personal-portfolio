"use client";

import { AnimatePresence, m } from "framer-motion";
import { type ReactElement } from "react";
import { useExperienceLoaderState, useExperienceReady } from "../experience-loader";
import { TypewriterEffectGreeting } from "./typewriter-effect-greeting";
import { BlurredBackgroundColors } from "./blurred-background-colors";

export function WelcomeMessage({ message }: { message: string }): ReactElement {
  const isReady = useExperienceReady();
  
  return (
    <AnimatePresence>
      { !isReady && <BlurredBackgroundColors key="bg-colors" />}
      { !isReady && <TypewriterEffectGreeting message={message} key="welcome-message-typewriter" />}
    </AnimatePresence>
  )
}