import type { ReactElement } from "react";
import { ResumeSection } from "./resume_section";
import { Separator } from "@/components/ui/separator";

const tiers = ['😍', '😁', '🙂'] as const;
type Tier = typeof tiers[number];

interface ProgrammingLanguageRef {
  tier: Tier;
  name: string;
}

const languages = [
  { tier: '😍', name: 'TypeScript' },
  { tier: '😍', name: 'Rust' },
  { tier: '😍', name: 'Python' },
  { tier: '😁', name: 'C++' },
  { tier: '😁', name: 'C' },
  { tier: '😁', name: 'C#' },
  { tier: '😁', name: 'JavaScript' },
  { tier: '😁', name: 'HTML' },
  { tier: '😁', name: 'CSS' },
  { tier: '😁', name: 'SQL' },
  { tier: '🙂', name: 'Java' },
  { tier: '🙂', name: 'PHP' },
  { tier: '🙂', name: 'Perl' },
  { tier: '🙂', name: 'R' },
] as const satisfies ProgrammingLanguageRef[];

interface ProgrammingLanguageTierProps {
  tier: Tier;
}

function ProgrammingLanguageTier({ tier }: ProgrammingLanguageTierProps) {
  const tierLanguages = languages.filter(language => language.tier === tier);
  
  return (
    <li key={tier} className="w-full flex flex-row gap-2 items-center">
      <h3 className="text-lg">{tier}</h3>
      <Separator orientation="vertical" decorative={true} />
      <ul className="flex flex-row gap-2 flex-wrap">
        {
          tierLanguages.map((language, index) => (
            <li key={language.name}>{language.name}{index===tierLanguages.length-1 ? null: ", "}</li>
          ))
        }
      </ul>
    </li>
  )
}

function ProgrammingLanguageTierList() {
  return (
    <ol className="list-none flex flex-col w-full gap-2">
      {
        tiers.map((tier: Tier) => (
          <ProgrammingLanguageTier key={tier} tier={tier} />
        ))
      }
    </ol>
  )
}

export function FavProgrammingLanguages({ widthClassName }: { widthClassName: string }): ReactElement {
  return (
    <ResumeSection
      title="Programming Languages"
      widthClassName={widthClassName}
    >
      <ProgrammingLanguageTierList />
    </ResumeSection>
  );
}
