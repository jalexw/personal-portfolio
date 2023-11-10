"use client";

import { DynamicExperience } from "@/components/experience";
import { HeaderBar } from "@/components/header";
import { WelcomeMessage } from "@/components/welcome-message";
import { AnimatePresence } from "framer-motion";
import type { ReactElement } from "react";

export function PortfolioExperienceContent(): ReactElement {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <HeaderBar />

      <div
        id="welcome-message-container"
        className="w-full overflow-x-hidden flex items-center justify-center z-10"
      >
        <WelcomeMessage />
      </div>
      
      <AnimatePresence>
        <DynamicExperience />
      </AnimatePresence>
    </main>
  )
}
