"use client";

import { cn } from "@schemavaults/ui";
import type { PropsWithChildren, ReactElement } from "react";

export interface IndexPageSectionTemplateProps extends PropsWithChildren {
  id: string;
  title: string;
  className?: string;
}

export function IndexPageSectionTemplate({
  title,
  id,
  children,
  ...props
}: IndexPageSectionTemplateProps): ReactElement {
  return (
    <section
      id={id}
      className={cn(
        "flex flex-col",
        "items-center justify-start",
        "p-2 md:p-4 lg:p-6 xl:p-8",
        props.className,
      )}
    >
      <h2 className="text-xl font-semibold p-4">{title}:</h2>
      {children}
    </section>
  );
}

export default IndexPageSectionTemplate;
