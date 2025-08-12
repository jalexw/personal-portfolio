"use client";

import { cn } from "@schemavaults/ui";
import Image from "next/image";
import type { ReactElement } from "react";
import IndexPageSectionTemplate from "../IndexPageSectionTemplate";

interface CurrentProjectCardProps {
  title: string;
  img_src: string;
  href: string;
}

function CurrentProjectCard({
  title,
  img_src,
  href,
}: CurrentProjectCardProps): ReactElement {
  const containerSize: string = "h-16 w-48";
  return (
    <li
      className={cn(
        "bg-card text-card-foreground",
        containerSize,
        "border rounded-md",
      )}
    >
      <a className={cn(containerSize, "flex flex-row gap-0")} href={href}>
        <div className="h-16 w-16 flex items-center justify-center">
          <Image src={img_src} alt={title} width={40} height={40} />
        </div>
        <div className="h-16 w-32 flex items-center justify-center">
          <span>{title}</span>
        </div>
      </a>
    </li>
  );
}

export function CurrentProjectsSection(): ReactElement {
  return (
    <IndexPageSectionTemplate
      title="Current Projects"
      id="current-projects-section"
      className="min-h-[40vh]"
    >
      <ul className="flex flex-row justify-center gap-2 md:gap-4 items-center">
        <CurrentProjectCard
          title={"SchemaVaults"}
          img_src="/images/schemavaults.png"
          href={"https://schemavaults.com"}
        />
      </ul>
    </IndexPageSectionTemplate>
  );
}

export default CurrentProjectsSection;
