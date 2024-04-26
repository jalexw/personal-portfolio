import type { ReactElement } from "react";
import { ResumeSection } from "./resume_section";

interface TechnicalSkillsProps {
  widthClassName?: string;
}

export function TechnicalSkills({ widthClassName }: TechnicalSkillsProps): ReactElement {
  return (
    <ResumeSection widthClassName={widthClassName} title="Technical Skills">
      <p>blah</p>
    </ResumeSection>
  )
}
