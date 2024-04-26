import type { ReactElement } from "react";
import { ResumeSection } from "./resume_section";
import { Badge } from "@/components/ui/badge";

export interface TechnicalSkillDef {
  label: string;
}

interface TechnicalSkillsProps {
  widthClassName?: string;
  skills?: TechnicalSkillDef[];
}

const technical_skills: TechnicalSkillDef[] = [
  { label: "Kubernetes" },
  { label: "Docker" },
  { label: "TensorFlow" },
  { label: "C.I. & C.D." },
  { label: "React" },
  { label: "Three.js & WebGL" },
  { label: "Next.js" },
  { label: "React Native" },
  { label: "Angular" },
  { label: "Vue" },
  { label: "Terraform" },
  { label: "Cypress E2E" },
  { label: "WebSockets" },
  { label: "Redis" },
  { label: "Turborepo" },
  { label: "Relational DBs" },
  { label: "NoSQL" },
  { label: "Django" },
  { label: "tRPC" },
  { label: "REST" },
  { label: "NLP" }
]

export function TechnicalSkills({ skills, widthClassName }: TechnicalSkillsProps): ReactElement {
  return (
    <ResumeSection
      widthClassName={widthClassName}
      title="Selected Technical Skills"
    >
      <ul className="flex flex-row flex-wrap gap-1 justify-around">
        {
          (skills ?? technical_skills).map(skill => (
            <Badge key={skill.label}>
              {skill.label}
            </Badge>
          ))
        }
      </ul>
    </ResumeSection>
  )
}
