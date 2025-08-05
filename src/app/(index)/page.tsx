"use client";

import type { ReactElement } from "react";
import { PortfolioExperienceProvider } from "./providers";
import { PortfolioExperienceContent } from "./portfolio_layout";
import useDebug from "@/hooks/useDebug";

export default function IndexPage(): ReactElement {
  const debug: boolean = useDebug();

  if (debug) {
    console.log("[IndexPage] rendering...");
  }

  return (
    <PortfolioExperienceProvider>
      <PortfolioExperienceContent />
    </PortfolioExperienceProvider>
  );
}
