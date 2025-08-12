"use client";

import { PortfolioExperienceProvider } from "@/components/experience-loader";
import type { PropsWithChildren, ReactElement } from "react";

function IndexPageProviders({ children }: PropsWithChildren): ReactElement {
  return <PortfolioExperienceProvider>{children}</PortfolioExperienceProvider>;
}
export default IndexPageProviders;
