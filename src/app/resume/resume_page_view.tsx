"use client";

import type { ReactElement } from "react";
import ResumeLayout from "./resume_layout";
import ResumePageContainer from "./resume_page_container";

export default function ResumePageView(): ReactElement {
  return (
    <ResumePageContainer>
      <ResumeLayout />
    </ResumePageContainer>
  );
}
