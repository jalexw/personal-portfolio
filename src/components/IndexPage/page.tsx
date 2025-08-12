"use client";

import type { ReactElement } from "react";
import PortfolioExperienceContent from "./portfolio_layout";
import useDebug from "@/hooks/useDebug";

export function IndexPage(): ReactElement {
  const debug: boolean = useDebug();

  if (debug) {
    console.log("[IndexPage] rendering...");
  }

  return <PortfolioExperienceContent />;
}

export default IndexPage;
