"use client";

import type { ReactElement } from "react";

// Text for opening statement
import { openingStatement } from "./opening_statement";

// Resume Sections
import { ResumeHeader } from "./resume_header";
import { FavProgrammingLanguages } from "./fav_programming_languages";
import { EducationAndCertificationsSection } from "./education_and_certifications";
import { WorkExperienceSection } from "./work_experience";
import { TechnicalSkills } from "./technical_skills";

// UI Components
import { cn, Separator } from "@schemavaults/ui";

export default function ResumeLayout(): ReactElement {
  return (
    <main
      className={cn("flex flex-col", "justify-start items-center", "gap-2")}
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
        <FavProgrammingLanguages widthClassName={cn("grow-0 min-w-[225px]")} />
        <Separator
          orientation="vertical"
          decorative={true}
          className="min-h-[140px] my-auto"
        />
        <TechnicalSkills widthClassName={cn("grow")} />
      </div>
      <WorkExperienceSection />
    </main>
  );
}
