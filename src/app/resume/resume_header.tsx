import { email } from "@/metadata";
import domain from "@/metadata/domain";
import { githubUser } from "@/metadata/github";
import { linkedInUser } from "@/metadata/linkedin";
import { Separator } from "@schemavaults/ui";
import { Briefcase, Github, Linkedin, Mail } from "lucide-react";
import type { ReactElement } from "react";

export function ResumeHeader(): ReactElement {
  const PORTFOLIO_SITE_URL: string = `https://${domain()}`;
  return (
    <>
      <header className="w-full flex flex-row items-center justify-between">
        {/** Social Media Links */}
        <div className="">
          <a
            href={`https://github.com/${githubUser}`}
            className="flex flex-row gap-2"
          >
            <Github className="p-1" />
            <span className="text-black">{githubUser}</span>
          </a>
          <a
            href={`https://linkedin.com/in/${linkedInUser}`}
            className="flex flex-row gap-2"
          >
            <Linkedin className="text-white bg-blue-800 p-1 print:bg-transparent print:text-black" />
            <span className="text-black">{linkedInUser}</span>
          </a>
        </div>

        {/** Title */}
        <div className="grow flex flex-col items-center justify-center">
          <h1 className="font-bold text-2xl">J. Alex Whitman{"'"}s Resume</h1>
          <h2 className="text-xl">Full-Stack Developer & Data Scientist</h2>
        </div>

        {/** Get in touch */}
        <div>
          <a href={`mailto:${email}`} className="flex flex-row gap-2">
            <Mail className="p-1" />
            <span className="text-black">{email}</span>
          </a>
          <a href={PORTFOLIO_SITE_URL} className="flex flex-row gap-2">
            <Briefcase className="p-1" />
            <span className="text-black">{PORTFOLIO_SITE_URL}</span>
          </a>
        </div>
      </header>
      <Separator decorative={true} />
    </>
  );
}
