"use client";

import type { ReactElement } from "react";
import getPortfolioGithubRepositoryHref from "@/metadata/PortfolioGithubRepository";
import { cn } from "@schemavaults/ui";
import Link from "next/link";
import { Code2 } from "lucide-react";

const githubRepoLink: string = getPortfolioGithubRepositoryHref();

export default function ThisPortfolioIsOpenSourceSection(): ReactElement {
  return (
    <div
      className={cn(
        "w-full",
        "flex flex-col sm:flex-row",
        "items-center justify-center",
        "px-4 pt-4 pb-16",
        "gap-4",
      )}
    >
      <Code2 className="w-6 h-6" />
      <p className="text-sm italic text-center">
        This portfolio site and the attached resumé are open-source:{" "}
        <Link
          href={githubRepoLink}
          className={cn("underline", "text-blue-500")}
          target="_blank"
          referrerPolicy="no-referrer"
        >
          {githubRepoLink}
        </Link>
      </p>
    </div>
  );
}
