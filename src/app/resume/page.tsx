// resume/page.tsx - Resume written with React components

// React/Next Imports
import type { ReactElement } from "react";
import type { Metadata } from "next";

// Resume Sections
import { ResumeHeader } from "./resume_header";
import { FavProgrammingLanguages } from "./fav_programming_languages";
import { EducationAndCertificationsSection } from "./education_and_certifications";
import { WorkExperienceSection } from "./work_experience";
import { TechnicalSkills } from "./technical_skills";

// UI Components
import { Separator } from "@/components/ui/separator";

const openingStatement: string =
  `I'm a fast learning team player with a passion for system design and using cutting edge technology to solve problems. ` +
  `I'm looking for opportunities to apply my skills in developing full-stack applications, databases, and machine learning models to create innovative solutions.`

export default function Resume(): ReactElement {
  return (
    <div className="
      grid place-items-center
      min-h-screen print:min-h-0
      bg-gray-400"
    >
      <main className="
        m-4 lg:m-12 print:m-0
        h-[297mm] w-[210mm] print:h-screen
        overflow-hidden
        rounded-md print:rounded-none
        bg-white
        text-black
        p-8
        shadow-lg print:shadow-none
        flex flex-col justify-start items-center gap-2
      ">
        <ResumeHeader />
        <p className="text-sm">{openingStatement}</p>
        <div className="w-full flex flex-row gap-4">
          <FavProgrammingLanguages
            widthClassName="grow-0 min-w-[250px]"
          />
          <Separator orientation="vertical" decorative={true} />
          <TechnicalSkills
            widthClassName="grow"
          />
        </div>
        <EducationAndCertificationsSection />
        <WorkExperienceSection />
      </main>
    </div>
  )
}

export const metadata: Metadata = {
  title: "J. Alex Whitman's Resume",
  description: openingStatement,
}
