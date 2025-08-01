import type { ReactElement } from "react";
import { ResumeSection } from "./resume_section";
import { Badge } from "@schemavaults/ui";
import { cn } from "@/lib/utils";

export interface TechnicalSkillDef {
  label: string;
}

interface TechnicalSkillsProps {
  widthClassName?: string;
  skills?: TechnicalSkillDef[];
}

const technical_skills: TechnicalSkillDef[] = [
  { label: "Cross-Platform Apps" },
  { label: "LLMs & NLP" },
  { label: "Deep Learning" },
  { label: "C.I. & C.D." },
  { label: "React.js/Next.js" },
  { label: "Containerization & Kubernetes" },
  { label: "React Native" },
  { label: "3D Rendering" },
  { label: "Cryptography" },
  { label: "Authentication" },
  { label: "Tauri" },
  { label: "Test-Driven Development" },
  { label: "WebSockets" },
  { label: "Redis" },
  { label: "Turborepo" },
  { label: "Terraform" },
  { label: "APIs: REST, tRPC, GraphQL" },
  { label: "O.O.P." },
  { label: "Vector Search" },
];

export function TechnicalSkills({
  skills,
  widthClassName,
}: TechnicalSkillsProps): ReactElement {
  return (
    <ResumeSection
      widthClassName={widthClassName}
      title="Core Technical Skills"
    >
      <ul className="flex flex-row flex-wrap gap-1 justify-around">
        {(skills ?? technical_skills).map((skill) => (
          <Badge
            key={skill.label}
            className={cn(
              "text-black bg-transparent border-dashed border-slate-400",
              "hover:text-white hover:bg-slate-400 hover:border-transparent",
              "print:hover:text-black print:hover:bg-transparent print:hover:border-slate-400",
            )}
          >
            {skill.label}
          </Badge>
        ))}
      </ul>
    </ResumeSection>
  );
}
