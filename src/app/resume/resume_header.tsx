import { Separator } from "@schemavaults/ui";
import { Briefcase, Github, Linkedin, Mail } from "lucide-react";
import type { ReactElement } from "react";

export function ResumeHeader(): ReactElement {
  return (
    <>
      <header className="w-full flex flex-row items-center justify-between">
        {/** Social Media Links */}
        <div className="">
          <a
            href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}`}
            className="flex flex-row gap-2"
          >
            <Github className="p-1" />
            <span className="text-black">
              {process.env.NEXT_PUBLIC_GITHUB_USERNAME}
            </span>
          </a>
          <a
            href={`https://linkedin.com/in/${process.env.NEXT_PUBLIC_LINKEDIN_USERNAME}`}
            className="flex flex-row gap-2"
          >
            <Linkedin className="text-white bg-blue-800 p-1 print:bg-transparent print:text-black" />
            <span className="text-black">
              {process.env.NEXT_PUBLIC_LINKEDIN_USERNAME}
            </span>
          </a>
        </div>

        {/** Title */}
        <div className="grow flex flex-col items-center justify-center">
          <h1 className="font-bold text-2xl">J. Alex Whitman{"'"}s Resume</h1>
          <h2 className="text-xl">Full-Stack Developer & Data Scientist</h2>
        </div>

        {/** Get in touch */}
        <div>
          <a
            href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
            className="flex flex-row gap-2"
          >
            <Mail className="p-1" />
            <span className="text-black">
              {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
            </span>
          </a>
          <a
            href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}`}
            className="flex flex-row gap-2"
          >
            <Briefcase className="p-1" />
            <span className="text-black">
              {process.env.NEXT_PUBLIC_WEB_DOMAIN}
            </span>
          </a>
        </div>
      </header>
      <Separator decorative={true} />
    </>
  );
}
