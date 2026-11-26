"use client";

import type { ReactElement } from "react";

// Text for opening statement
import { openingStatement } from "./opening_statement";

// Resume Sections
import ResumeHeader, { ResumeContinuationHeader } from "./resume_header";
import EducationAndCertificationsSection from "./education_and_certifications";
import FavProgrammingLanguagesSection from "./fav_programming_languages";
import TechnicalSkillsSection from "./technical_skills";
import WorkExperienceSection, {
  EARLIER_WORK_EXPERIENCES,
  RECENT_WORK_EXPERIENCES,
} from "./work_experience";

// Page Layout
import ResumeSheet from "./resume_sheet";

// UI Components
import { cn, Separator } from "@schemavaults/ui";

const PAGE_COUNT = 2 as const satisfies number;

export default function ResumeLayout(): ReactElement {
  return (
    <>
      {/** Page 1: overview + recent work experience */}
      <ResumeSheet className="justify-between">
        <ResumeHeader />
        <p className="text-sm">{openingStatement}</p>
        <EducationAndCertificationsSection />
        <div
          className={cn(
            "w-full",
            "flex flex-row",
            "items-stretch justify-around",
            "gap-2",
          )}
        >
          <FavProgrammingLanguagesSection
            widthClassName={cn("grow-0 min-w-[225px]")}
          />
          <Separator
            orientation="vertical"
            decorative={true}
            className="min-h-[140px] my-auto"
          />
          <TechnicalSkillsSection widthClassName={cn("grow")} />
        </div>
        <WorkExperienceSection
          title="Selected Work Experience"
          experiences={RECENT_WORK_EXPERIENCES}
        />
      </ResumeSheet>

      {/** Page 2: older work experience */}
      <ResumeSheet>
        <ResumeContinuationHeader pageNumber={2} pageCount={PAGE_COUNT} />
        <WorkExperienceSection
          title="Earlier Work Experience"
          experiences={EARLIER_WORK_EXPERIENCES}
        />
      </ResumeSheet>
    </>
  );
}
