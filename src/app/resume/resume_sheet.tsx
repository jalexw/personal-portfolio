import { cn } from "@schemavaults/ui";
import type { PropsWithChildren, ReactElement } from "react";

export interface ResumeSheetProps extends PropsWithChildren {
  className?: string;
}

// A single page of the resume: an A4 sheet on screen, and exactly one
// printed page in the PDF export (each sheet after the first starts a new page)
export default function ResumeSheet({
  children,
  className,
}: ResumeSheetProps): ReactElement {
  return (
    <div
      className={cn(
        "shrink-0 mx-auto",
        "h-[297mm] w-[210mm] print:h-screen",
        "overflow-hidden",
        "rounded-md print:rounded-none",
        "bg-white",
        "text-black",
        "p-[5mm] print:p-0",
        "shadow-lg print:shadow-none",
        "break-after-page last:break-after-auto",
        "flex flex-col",
        "justify-start items-center",
        "gap-2",
        className,
      )}
    >
      {children}
    </div>
  );
}
