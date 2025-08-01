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
import { Separator } from "@schemavaults/ui";

export default function ResumeLayout(): ReactElement {
  return (
    <main className="flex flex-col justify-start items-center gap-2">
      <ResumeHeader />
      <p className="text-sm">{openingStatement}</p>
      <div className="w-full flex flex-row gap-4">
        <FavProgrammingLanguages widthClassName="grow-0 min-w-[250px]" />
        <Separator orientation="vertical" decorative={true} />
        <TechnicalSkills widthClassName="grow" />
      </div>
      <EducationAndCertificationsSection />
      <WorkExperienceSection />
    </main>
  );
}
