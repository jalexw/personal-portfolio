"use client";

import { cn } from "@schemavaults/ui";
import type { PropsWithChildren, ReactElement } from "react";

export interface ResumePageContainerProps extends PropsWithChildren {}

// Stacks the resume's sheets (see 'resume_sheet.tsx') on a grey backdrop on
// screen; in print, the backdrop is removed and each sheet fills a page
export default function ResumePageContainer({
  children,
}: ResumePageContainerProps): ReactElement {
  return (
    <main
      className={cn(
        "flex flex-col print:block",
        "gap-4 lg:gap-12",
        "p-4 lg:p-12 print:p-0",
        "min-h-screen print:min-h-0",
        "bg-gray-400 print:bg-white",
        "overflow-x-scroll print:overflow-visible",
      )}
    >
      {children}
    </main>
  );
}
