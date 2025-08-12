"use client";

import { type ReactElement } from "react";

// Index Page Sections:
import AvatarSection from "./sections/avatar_section";
import SpacerSection from "./sections/spacer_section";
import CurrentProjectsSection from "./sections/current_projects_section";
import SocialMediaLinksSection from "./sections/social_media_links_section";

export function PortfolioExperienceContent(): ReactElement {
  return (
    <main className="flex flex-col gap-0 flex-nowrap">
      <AvatarSection />
      <SpacerSection />
      <CurrentProjectsSection />
      <SocialMediaLinksSection />
    </main>
  );
}

export default PortfolioExperienceContent;
