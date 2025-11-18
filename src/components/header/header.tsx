"use client";

import Link from "next/link";
import type { ReactElement } from "react";

import { fullName } from "@/metadata/name";

import { ResumeLink } from "@/components/resume-link";
import ContactDialog, {
  ContactFormDialogTriggerButton,
} from "@/components/ContactFormDialog";
import { ThemeModeSelection } from "@/components/toggle-theme-button";
import { cn } from "@schemavaults/ui";

export function HeaderBar(): ReactElement {
  return (
    <header
      className={cn(
        "flex flex-col lg:flex-row",
        "items-center justify-between",
        "m-4",
        "gap-2 sm:gap-4",
        "w-full max-w-5xl",
        "p-4 sm:p-8 md:p-12 lg:p-16",
        "z-50",
      )}
    >
      {/** Title */}
      <Link href="/">
        <h1
          className={cn(
            "text-md sm:text-lg md:text-xl",
            "font-bold",
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
        <ContactFormDialogTriggerButton />
        <ThemeModeSelection />
      </div>
    </header>
  );
}

export default HeaderBar;
