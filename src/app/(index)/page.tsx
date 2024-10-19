import type { ReactElement } from "react";
import { PortfolioExperienceProvider } from "./providers";
import { PortfolioExperienceContent } from "./portfolio_layout";

export default function IndexPage(): ReactElement {
  return (
    <PortfolioExperienceProvider>
      <PortfolioExperienceContent />
    </PortfolioExperienceProvider>
  );
}
