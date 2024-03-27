import { Separator } from "@/components/ui/separator";
import type { PropsWithChildren, ReactElement } from "react";

export interface ResumeSectionProps extends PropsWithChildren {
  title: string;
}

export function ResumeSection({ title, children }: ResumeSectionProps) {
  return (
    <section className="w-full flex flex-col gap-2">
      <h2 className="text-xl">{title}</h2>
      <Separator />
      {children}
    </section>
  )
}