import { Separator } from "@schemavaults/ui";
import type { PropsWithChildren, ReactElement } from "react";
import { cn } from "@schemavaults/ui";

export interface ResumeSectionProps extends PropsWithChildren {
  title: string;
  widthClassName?: string;
}

export function ResumeSection({
  title,
  children,
  widthClassName,
}: ResumeSectionProps): ReactElement {
  return (
    <section className={cn("flex flex-col gap-0", widthClassName ?? "w-full")}>
      <h2 className={cn("text-lg", "text-nowrap", "font-semibold")}>{title}</h2>
      <Separator decorative={true} className={cn("mt-0.5 mb-2")} />
      {children}
    </section>
  );
}

export default ResumeSection;
