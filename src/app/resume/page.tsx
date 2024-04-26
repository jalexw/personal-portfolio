import type { ReactElement } from "react";
import { ResumeHeader } from "./resume_header";
import { FavProgrammingLanguages } from "./fav_programming_languages";
import { EducationAndCertificationsSection } from "./education_and_certifications";
import { WorkExperienceSection } from "./work_experience";
import { Separator } from "@/components/ui/separator";
import { TechnicalSkills } from "./technical_skills";

const openingStatement: string = `I'm a recent graduate with expertise in developing full-stack applications, databases, and machine learning models. I'm a fast learning team player with a passion for system design and using cutting edge technology to solve problems.`

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
          <FavProgrammingLanguages widthClassName="" />
          <Separator orientation="vertical" />
          <TechnicalSkills widthClassName="grow" />
        </div>
        <EducationAndCertificationsSection />
        <WorkExperienceSection />
      </main>
    </div>
  )
}
