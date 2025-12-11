"use client";

import type { ReactElement } from "react";

// Text for opening statement
import { openingStatement } from "./opening_statement";

// Resume Sections
import ResumeHeader from "./resume_header";
import EducationAndCertificationsSection from "./education_and_certifications";
import FavProgrammingLanguagesSection from "./fav_programming_languages";
import TechnicalSkillsSection from "./technical_skills";
import WorkExperienceSection from "./work_experience";

// UI Components
import { cn, Separator } from "@schemavaults/ui";

export default function ResumeLayout(): ReactElement {
  return (
    <main
      className={cn(
        "w-full h-full",
        "flex flex-col",
        "justify-start items-center",
        "gap-2",
      )}
    >
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
      <WorkExperienceSection heightClassName="grow" />
    </main>
  );
}
