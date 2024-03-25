"use client";

import { DynamicExperience } from "@/components/experience";
import { HeaderBar } from "@/components/header";
import { Button } from "@/components/ui/button";
import { WelcomeMessage } from "@/components/welcome-message";
import { AnimatePresence } from "framer-motion";
import { FileText } from "lucide-react";
import Link from "next/link";
import type { ReactElement } from "react";

export function PortfolioExperienceContent(): ReactElement {
  return (
    <main>
      {/** Contains all user-interactable DOM content (like text that fades in as you scroll) */}
      <div
        id="dom-content"
        className="w-full h-full fixed top-0 left-0 z-10 flex flex-col justify-start items-center overflow-y-scroll"
      >
        <HeaderBar />

        <div
          id="welcome-message-container"
          className="w-full overflow-x-hidden flex items-center justify-center z-10"
        >
          <WelcomeMessage />
        </div>

        <div
          id="resume-call-to-action-container"
          className="w-full mt-[80vh] z-10 justify-start items-center flex flex-col grow sm:p-2 md:p-4 lg:p-8 xl:p-12 mb-24"
        >
          <Link href="/resume">
            <Button className="gap-2">
              <FileText className="w-4 h-4" /> View my resume
            </Button>
          </Link>
        </div>
      </div>
      
      
      <AnimatePresence>
        <DynamicExperience />
      </AnimatePresence>
    </main>
  )
}
