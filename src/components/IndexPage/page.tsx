"use client";

import type { ReactElement } from "react";
import PortfolioLayout from "./portfolio_layout";
import useDebug from "@/hooks/useDebug";
import ContactFormDialog from "@/components/ContactFormDialog";

export function IndexPage(): ReactElement {
  const debug: boolean = useDebug();

  if (debug) {
    console.log("[IndexPage] rendering...");
  }

  return (
    <>
      <PortfolioLayout />
      <ContactFormDialog />
    </>
  );
}

export default IndexPage;
