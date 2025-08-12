"use client";

import type { ReactElement } from "react";
import AvatarSection from "./avatar_section";
import SpacerSection from "./spacer_section";
import CurrentProjectsSection from "./current_projects_section";

export function PortfolioExperienceContent(): ReactElement {
  return (
    <main className="flex flex-col gap-0 flex-nowrap">
      <AvatarSection />
      <SpacerSection />
      <CurrentProjectsSection />
    </main>
  );
}

export default PortfolioExperienceContent;
