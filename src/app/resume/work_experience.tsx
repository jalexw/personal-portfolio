import type { FC, ReactElement, ReactNode } from "react";
import ResumeSection from "./resume_section";
import { cn, Separator } from "@schemavaults/ui";

interface PastJobDescriptionProps {
  job_title: string;
  company_name: string;
  time_description: string | FC; // e.g. 2023 - 2025
  job_duties: string[];
}

function PastJobDescription(props: PastJobDescriptionProps): ReactElement {
  return (
    <li
      className={cn(
        "flex flex-col",
        "justify-start items-start",
        "text-left w-full",
        "text-black",
      )}
    >
      <header className="flex flex-row justify-between w-full pb-1">
        <h3 className="text-xs">
          <span className="font-bold">{props.company_name}</span>,{" "}
          {props.job_title}
        </h3>
        <p className="text-xs font-bold">
          {typeof props.time_description === "string"
            ? props.time_description
            : props.time_description({})}
        </p>
      </header>
      <ul className="w-full flex flex-col gap-1 list-disc list-inside">
        {props.job_duties.map((duty, index) => (
          <li key={index} className="text-xs">
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
      className="border-dashed px-16 border-slate-300 border-t bg-transparent print:border-slate-300 mt-2 mb-1"
      decorative={true}
    />
  );
}

const WORK_EXPERIENCES: readonly PastJobDescriptionProps[] = [
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

export function WorkExperienceSection({
  heightClassName,
}: {
  heightClassName: string;
}): ReactElement {
  const sectionContent: ReactNode[] = [];

  for (const [index, job] of WORK_EXPERIENCES.entries()) {
    sectionContent.push(
      <PastJobDescription key={`past-job-${index}`} {...job} />,
    );
    if (index !== WORK_EXPERIENCES.length - 1) {
      sectionContent.push(
        <WorkExperienceSeparator key={`work-experience-separator-${index}`} />,
      );
    }
  }

  return (
    <ResumeSection
      title="Selected Work Experience"
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

export default WorkExperienceSection;
