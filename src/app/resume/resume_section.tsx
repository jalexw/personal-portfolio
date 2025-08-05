import { Separator } from "@schemavaults/ui";
import type { PropsWithChildren, ReactElement } from "react";
import { cn } from "@/lib/utils";

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
    <section className={cn("flex flex-col gap-2", widthClassName ?? "w-full")}>
      <h2 className="text-xl text-nowrap">{title}</h2>
      <Separator decorative={true} />
      {children}
    </section>
  );
}

export default ResumeSection;
