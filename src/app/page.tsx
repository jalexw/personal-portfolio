import type { ReactElement } from "react";
import { PortfolioExperienceLoadingManager } from "./providers";
import { PortfolioExperienceContent } from "./portfolio";

export default function IndexPage(): ReactElement {
  return (
    <PortfolioExperienceLoadingManager>
      <PortfolioExperienceContent />
    </PortfolioExperienceLoadingManager>
  );
}
