"use client";

import type { ReactElement } from "react";
import IndexPageSectionTemplate from "../IndexPageSectionTemplate";
import SocialMediaLinks from "@/components/SocialMediaLinks";

export function SocialMediaLinksSection(): ReactElement {
  return (
    <IndexPageSectionTemplate
      title="Connect with me"
      id="social-media-links-section"
      className="min-h-[40vh]"
    >
      <SocialMediaLinks />
    </IndexPageSectionTemplate>
  );
}

export default SocialMediaLinksSection;
