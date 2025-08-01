"use client";

import Link from "next/link";
import type { ReactElement } from "react";

import { fullName } from "@/metadata/name";

import { ResumeLink } from "@/components/resume-link";
import { ContactDialog } from "@/components/contact";
import { ThemeModeSelection } from "@/components/toggle-theme-button";
import { useExperienceReady } from "@/components/experience-loader";
import { cn } from "@/lib/utils";

export function HeaderBar(): ReactElement {
  const experienceReady: boolean = useExperienceReady([
    "placeholder_exit",
    "canvas",
    "initial_assets",
    "typewriter_effect_exit",
  ]);

  return (
    <header
      className="
        flex flex-col lg:flex-row
        items-center justify-between
        m-4
        gap-2 sm:gap-4
        w-full max-w-5xl
        p-4 sm:p-8 md:p-12 lg:p-16
      "
    >
      {/** Title */}
      <Link href="/">
        <h1
          className={cn(
            "text-md sm:text-lg md:text-xl",
            "font-mono font-bold",
            "text-center lg:text-left",
            "transition-colors duration-500",
          )}
        >
          {fullName}
        </h1>
      </Link>

      {/** Buttons */}
      <div
        className="
          flex
          flex-col
          sm:flex-row
          flex-wrap
          gap-1 sm:gap-2 md:gap-4
          justify-start
          items-center
        "
      >
        <ResumeLink />
        <ContactDialog />
        <ThemeModeSelection />
      </div>
    </header>
  );
}
