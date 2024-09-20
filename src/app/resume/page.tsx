// resume/page.tsx - Resume written with React components

// React/Next Imports
import type { ReactElement } from "react";
import type { Metadata } from "next";
import ResumeLayout from "./resume_layout";
import ResumePageContainer from "./resume_page_container";
import { openingStatement } from "./opening_statement";

export default function Resume(): ReactElement {
  return (
    <ResumePageContainer>
      <ResumeLayout />
    </ResumePageContainer>
  );
}

export const metadata: Metadata = {
  title: "J. Alex Whitman's Resume",
  description: openingStatement,
};
