"use client";

import type { ReactElement } from "react";
import ResumeSection from "./resume_section";
import { cn, Separator } from "@schemavaults/ui";

const tiers = ["🥇", "🥈", "🥉"] as const;
type Tier = (typeof tiers)[number];

interface ProgrammingLanguageRef {
  tier: Tier;
  name: string;
}

const languages: readonly ProgrammingLanguageRef[] = [
  { tier: "🥇", name: "TypeScript" },
  { tier: "🥇", name: "Rust" },
  { tier: "🥇", name: "Python" },
  { tier: "🥇", name: "HTML" },
  { tier: "🥇", name: "CSS" },
  { tier: "🥇", name: "Shell Scripts" },
  { tier: "🥇", name: "SQL" },
  { tier: "🥈", name: "JavaScript" },
  { tier: "🥈", name: "C" },
  { tier: "🥈", name: "C++" },
  { tier: "🥈", name: "C#" },
  { tier: "🥉", name: "Java" },
  { tier: "🥉", name: "PHP" },
  { tier: "🥉", name: "Perl" },
  { tier: "🥉", name: "R" },
];

interface ProgrammingLanguageTierProps {
  tier: Tier;
}

function ProgrammingLanguageTier({ tier }: ProgrammingLanguageTierProps) {
  const tierLanguages = languages.filter((language) => language.tier === tier);

  return (
    <li key={tier} className="w-full flex flex-row gap-2 items-center">
      <h3 className="text-lg">{tier}</h3>
      <Separator orientation="vertical" decorative={true} />
      <ul className="flex flex-row gap-2 flex-wrap">
        {tierLanguages.map((language, index) => (
          <li key={language.name}>
            {language.name}
            {index === tierLanguages.length - 1 ? null : ", "}
          </li>
        ))}
      </ul>
    </li>
  );
}

function ProgrammingLanguageTierList() {
  return (
    <ol
      className={cn(
        "grow",
        "list-none",
        "flex flex-col",
        "justify-around items-stretch",
        "w-full gap-2",
      )}
    >
      {tiers.map(
        (tier: Tier): ReactElement => (
          <ProgrammingLanguageTier key={tier} tier={tier} />
        ),
      )}
    </ol>
  );
}

export function FavProgrammingLanguagesSection({
  widthClassName,
}: {
  widthClassName: string;
}): ReactElement {
  return (
    <ResumeSection
      title="Programming Languages"
      widthClassName={widthClassName}
    >
      <ProgrammingLanguageTierList />
    </ResumeSection>
  );
}

export default FavProgrammingLanguagesSection;
