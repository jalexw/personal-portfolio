import { Briefcase, Github, Linkedin, Mail } from "lucide-react";
import type { ReactElement } from "react";

function ResumeHeader() {
  return (
    <header
      className="w-full flex flex-row items-center justify-between border-b p-1"
    >
      {/** Social Media Links */}
      <div className="">
        <a
          href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}`}
          className="flex flex-row gap-2"
        >
          <Github className="p-1" /> jalexw
        </a>
        <a
          href={`https://linkedin.com/in/${process.env.NEXT_PUBLIC_LINKEDIN_USERNAME}`}
          className="flex flex-row gap-2"
        >
          <Linkedin className="text-white bg-blue-800 p-1" /> jalexwhitman 
        </a>
      </div>

      {/** Title */}
      <div className="grow flex flex-col items-center justify-center">
        <h1 className="font-bold text-2xl">J. Alex Whitman{'\''}s Resume</h1>
        <h2 className="text-xl">Full-Stack Developer & Data Scientist</h2>
      </div>
      
      {/** Get in touch */}
      <div>
        <a
          href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
          className="flex flex-row gap-2"
        >
          <Mail className="p-1" /> {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
        </a>
        <a
          href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}`}
          className="flex flex-row gap-2"
        >
          <Briefcase className="p-1" /> {process.env.NEXT_PUBLIC_WEB_DOMAIN}
        </a>
      </div>
    </header>
  )
}

export default function Resume(): ReactElement {
  return (
    <div className="
      grid place-items-center
      min-h-screen print:min-h-0
      bg-gray-400"
    >
      <main className="
        m-4 lg:m-12 print:m-0
        h-[297mm] w-[210mm] print:h-screen
        overflow-hidden
        rounded-md print:rounded-none
        bg-white
        p-8
        shadow-lg print:shadow-none
        flex flex-col justify-start items-center gap-2
      ">
        <ResumeHeader />
        <p>Coming soon!</p>
      </main>
    </div>
  )
}
