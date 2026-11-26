import { Fragment } from "react";
import type { FC, ReactElement, ReactNode } from "react";
import ResumeSection from "./resume_section";
import { cn, Separator } from "@schemavaults/ui";

export interface PastJobDescriptionProps {
  job_title: string;
  company_name: string;
  time_description: string | (() => ReactNode); // e.g. 2023 - 2025
  job_duties: ReactNode[];
}

// Shared text size for each job's title row and duties
const jobEntryTextClassname = cn("text-[0.8125rem] leading-[1.1875rem]");

function PastJobDescription(props: PastJobDescriptionProps): ReactElement {
  const time_description: ReactNode = typeof props.time_description === "string"
    ? props.time_description
    : props.time_description()

  return (
    <li
      className={cn(
        "flex flex-col",
        "justify-start items-start",
        "text-left w-full",
        "text-black",
      )}
    >
      <header className="flex flex-row justify-between gap-2 w-full pb-1">
        <h3 className={jobEntryTextClassname}>
          <span className="font-bold">{props.company_name}</span>,{" "}
          {props.job_title}
        </h3>
        <p
          className={cn(
            jobEntryTextClassname,
            "font-bold shrink-0 whitespace-nowrap",
          )}
        >
          { time_description }
        </p>
      </header>
      <ul className="w-full flex flex-col gap-1 list-disc list-inside">
        {props.job_duties.map((duty, index) => (
          <li key={index} className={jobEntryTextClassname}>
            {duty}
          </li>
        ))}
      </ul>
    </li>
  );
}

const timeDescriptionDateAnnotationClassname = cn("text-gray-400 text-xs");

function WorkExperienceSeparator(): ReactElement {
  return (
    <Separator
      className="border-dashed px-16 border-slate-300 border-t bg-transparent print:border-slate-300 my-3"
      decorative={true}
    />
  );
}

// Current & most recent roles; shown on the first page of the resume
export const RECENT_WORK_EXPERIENCES: readonly PastJobDescriptionProps[] = [
  {
    job_title: "Director of Technology & Innovation",
    company_name: "BotreeInc",
    time_description: "2026 – Present",
    job_duties: [
      "Solo-built a custom learning management system (LMS) + learning record store (LRS), complete with SCORM package serving, AI coaching, and QR/NFC code-to-resource linking with analytics; its AI agents run in isolated sandboxes with scoped, delegated access.",
      "Built an AI-powered instructional design tool to accelerate instructional designers' workflows, from generating course outlines and micro-lessons to building SCORM packages.",
      "Built marketing websites for Botree's brands, plus a booking system for live workshops.",
      "Built tools for mapping existing workflows and SOPs, designing training around the captured processes, and generating quotes/estimates for that training.",
    ],
  },
  {
    job_title: "Web Developer",
    company_name: "Daniel Johnson Architect",
    time_description: (): ReactNode => (
      <>
        {"2025 – 2026"}{" "}
        <span className={timeDescriptionDateAnnotationClassname}>
          {"Contract"}
        </span>
      </>
    ),
    job_duties: [
      <Fragment key="djaarch-website">
        {"Built a Next.js website ("}
        <a href="https://djaarch.com" className="underline underline-offset-2">
          {"djaarch.com"}
        </a>
        {") from Jack Riley's designs, with Framer Motion animations and a Django CMS backend."}
      </Fragment>,
    ],
  },
  {
    job_title: "Software Developer",
    company_name: "Aycoutay Technologies Ltd.",
    time_description: (): ReactNode => (
      <>
        {"2024"}{" "}
        <span className={timeDescriptionDateAnnotationClassname}>
          {"Full-time"}
        </span>
        , {"2025"}{" "}
        <span className={timeDescriptionDateAnnotationClassname}>
          {"Part-time"}
        </span>
      </>
    ),
    job_duties: [
      "Built an app for electrode data collection, and real-time data analysis + visualization; a cross-platform Mac+Windows+Web app (Next.js/React.js/TypeScript/TailwindCSS/Redux, wrapped in a Tauri/Rust webview to collect data via native hardware driver).",
      "Rewrote Windows-only Visual Basic + C# USB driver as a cross-platform Rust driver (using rusb) to interact with hardware.",
      "Set up Auth0 authentication, RBAC, and a tRPC (full-stack type-safety) Node.js API to store electrical readings in MongoDB.",
      "Evaluated, built, and deployed biological age models (including k-NN, CNN, RNN, etc.) from electrode measurement dataset.",
    ],
  },
];

// Older roles; pushed to the second page of the resume
export const EARLIER_WORK_EXPERIENCES: readonly PastJobDescriptionProps[] = [
  {
    job_title: "Software Developer",
    company_name: "SolutionInc Ltd.",
    time_description: (): ReactNode => (
      <>
        {"2019"}{" "}
        <span className={timeDescriptionDateAnnotationClassname}>
          {"May-August"}
        </span>
        , {"2023"}{" "}
        <span className={timeDescriptionDateAnnotationClassname}>
          {"March-September"}
        </span>
      </>
    ),
    job_duties: [
      "Built customer and staff portal applications (using tech such as Angular.js, Express.js, Next.js, SQL) for a new ISP company to allow controlling and monitoring network + IPTV services + managing subscriptions with Chargebee. Designed and implemented high-availability Kubernetes cluster to host web applications across Proxmox cluster. Automated deployment w/ Helm & GitLab.",
      "Upgraded a legacy LAMPerl-stack network monitoring dashboard to use containers, Cypress E2E testing, GitLab C.I./C.D. Added a report editing feature to allow customers to customize their hotel/convention center network gateway usage reports.",
      "Returned in a software development position after working for a summer on the support & delivery team as a student, where I mostly worked on staging hardware with proprietary software for allowing secure in-room media casting in large hotel networks.",
    ],
  },
  {
    job_title: "Software Developer",
    company_name: "Praxes Medical Group Ltd.",
    time_description: (): ReactNode => (
      <>
        {"2021"}{" "}
        <span className={timeDescriptionDateAnnotationClassname}>
          {"May-September"}
        </span>
      </>
    ),
    job_duties: [
      "Maintained and updated their serverless COVID testing software for public rapid testing sites and B2B employer-led testing; facilitated the reporting of 300,000+ test results to patients, as well as aggregate statistic reports to stakeholders.",
      "Upgraded Firestore database to allow more performant result querying and storage of additional information about each test.",
      "Designed and implemented volunteer registration system w/ Firebase Cloud Functions, Firestore database, and Vue.js app.",
    ],
  },
  {
    job_title: "Software Developer & Service Desk Coordinator",
    company_name: "Race Auto Group Ltd.",
    time_description: (): ReactNode => (
      <>
        {"2017, 2018, 2020, 2022"}{" "}
        <span className={timeDescriptionDateAnnotationClassname}>
          {"Summer Jobs & Part-time"}
        </span>
      </>
    ),
    job_duties: [
      "Rapidly designed and implemented a Next.js/React.js rental car booking system for the dealership to capitalize on a local rental car shortage w/ a dynamic price-calendar system by vehicle type and embedded Stripe payment processing.",
      "Managed the service desk by creating work orders, ordering parts, resolving customer issues, and allocating mechanic time. Was responsible for keeping the company Wordpress website and integrated inventory system up to date.",
    ],
  },
];

export interface WorkExperienceSectionProps {
  title: string;
  experiences: readonly PastJobDescriptionProps[];
  heightClassName?: string;
}

export function WorkExperienceSection({
  title,
  experiences,
  heightClassName,
}: WorkExperienceSectionProps): ReactElement {
  const sectionContent: ReactNode[] = [];

  for (const [index, job] of experiences.entries()) {
    sectionContent.push(
      <PastJobDescription key={`past-job-${index}`} {...job} />,
    );
    if (index !== experiences.length - 1) {
      sectionContent.push(
        <WorkExperienceSeparator key={`work-experience-separator-${index}`} />,
      );
    }
  }

  return (
    <ResumeSection
      title={title}
      heightClassName={heightClassName}
    >
      <ul
        className={cn("grow", "flex flex-col", "items-stretch justify-around")}
      >
        {sectionContent}
      </ul>
    </ResumeSection>
  );
}

export default WorkExperienceSection satisfies FC<WorkExperienceSectionProps>;
