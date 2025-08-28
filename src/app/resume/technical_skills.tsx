import type { ReactElement } from "react";
import ResumeSection from "./resume_section";
import { Badge } from "@schemavaults/ui";
import { cn } from "@schemavaults/ui";

export interface TechnicalSkillDef {
  label: string;
}

interface TechnicalSkillsProps {
  widthClassName?: string;
  skills?: TechnicalSkillDef[];
}

const technical_skills: TechnicalSkillDef[] = [
  { label: "O.O.P." },
  { label: "Cross-Platform Apps (React Native + Tauri)" },
  { label: "LLMs & NLP" },
  { label: "Deep Learning" },
  { label: "C.I. & C.D." },
  { label: "Networking" },
  { label: "LangChain" },
  { label: "Airflow" },
  { label: "Containerization & Kubernetes" },
  { label: "3D Rendering" },
  { label: "Cryptography" },
  { label: "Authentication" },
  { label: "Test-Driven Development" },
  { label: "WebSockets" },
  { label: "Redis" },
  { label: "IaC (Terraform, Helm)" },
  { label: "APIs: REST, RPC, GraphQL" },
  { label: "Vector Search" },
  { label: "React.js/Next.js" },
  { label: "Vue.js" },
  { label: "Angular.js" },
  { label: ".NET" },
  { label: "Node.js" },
  { label: "Redux" },
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
              "text-xs print:text-[0.65rem] print:leading-[0.866rem]",
            )}
          >
            {skill.label}
          </Badge>
        ))}
      </ul>
    </ResumeSection>
  );
}
