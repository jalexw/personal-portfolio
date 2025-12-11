"use client";

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
  { label: "Object-Oriented Programming" },

  { label: "Functional Programming" },
  { label: "LLMs & NLP" },
  { label: "LangChain" },
  { label: "Deep Learning" },
  { label: "DevOps / C.I. & C.D." },
  { label: "Networking" },
  { label: "Airflow" },
  { label: "Docker" },
  { label: "Kubernetes" },
  { label: "3D Rendering" },
  { label: "Cryptography" },
  { label: "Authentication" },
  { label: "Test-Driven Development" },
  { label: "E2E Testing" },
  { label: "WebSockets" },
  { label: "Relational Databases" },
  { label: "NoSQL" },
  { label: "Redis" },
  { label: "Infrastructure-as-Code" },
  { label: "Terraform" },
  { label: "Helm" },
  { label: "APIs: REST, RPC, GraphQL" },
  { label: "Compilers, Bundlers, & Transpilers" },
  { label: "Vector Search" },
  { label: "React.js/Next.js" },
  { label: "Vue.js" },
  { label: "Angular.js" },
  { label: ".NET" },
  { label: "Node.js / Bun" },
  { label: "Redux" },
  { label: "Cross-Platform Apps" },
  { label: "React Native" },
  { label: "Tauri" },
  { label: "Electron" },
  { label: "Django" },
  { label: "Flask" },
  { label: "Express.js" },
];

export function TechnicalSkillsSection({
  skills,
  widthClassName,
}: TechnicalSkillsProps): ReactElement {
  return (
    <ResumeSection widthClassName={widthClassName} title="Technical Skills">
      <ul className="flex flex-row flex-wrap gap-1 justify-around">
        {(skills ?? technical_skills).map((skill) => (
          <Badge
            key={skill.label}
            className={cn(
              "text-black bg-transparent border-dashed border-slate-400",
              "hover:text-white hover:bg-slate-400 hover:border-transparent",
              "print:hover:text-black print:hover:bg-transparent print:hover:border-slate-400",
              "text-[0.65rem] leading-[0.866rem]",
            )}
          >
            {skill.label}
          </Badge>
        ))}
      </ul>
    </ResumeSection>
  );
}

export default TechnicalSkillsSection;
