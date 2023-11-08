import type { ReactElement } from "react";
import { PortfolioExperienceLoadingManager } from "./providers";
import { PortfolioExperienceContent } from "./experience";

export default function IndexPage(): ReactElement {
  return (
    <PortfolioExperienceLoadingManager>
      <PortfolioExperienceContent />
    </PortfolioExperienceLoadingManager>
  );
}
