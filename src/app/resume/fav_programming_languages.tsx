import type { ReactElement } from "react";
import { ResumeSection } from "./resume_section";

export function FavProgrammingLanguages(): ReactElement {
  return (
    <ResumeSection title="Favorite Programming Languages">
      <ul className="flex flex-col gap-2">
        <li>JavaScript</li>
        <li>TypeScript</li>
        <li>Python</li>
        <li>Java</li>
      </ul>
    </ResumeSection>
  );
}