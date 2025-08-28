import type { ReactElement } from "react";
import ResumeSection from "./resume_section";
import { Separator } from "@schemavaults/ui";

interface PastJobDescriptionProps {
  job_title: string;
  company_name: string;
  time_description: string; // e.g. 2023 - 2025
  job_duties: string[];
}

function PastJobDescription(props: PastJobDescriptionProps): ReactElement {
  return (
    <article className="flex flex-col justify-start items-start text-left w-full text-black">
      <header className="flex flex-row justify-between w-full pb-1">
        <h3 className="text-xs">
          <span className="font-bold">{props.company_name}</span>,{" "}
          {props.job_title}
        </h3>
        <p className="text-xs font-bold">{props.time_description}</p>
      </header>
      <ul className="w-full flex flex-col gap-1 list-disc list-inside">
        {props.job_duties.map((duty, index) => (
          <li key={index} className="text-xs">
            {duty}
          </li>
        ))}
      </ul>
    </article>
  );
}

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
    time_description: "2024, 2025",
    job_duties: [
      "Created cross-platform Mac+Windows+Web Tauri app (Next.js/React.js app w/ TypeScript, TailwindCSS, & Redux, wrapped in Rust webview to collect data w/ native hardware driver), allowing real-time analysis and visualization of measurement data.",
      "Rewrote Windows-only Visual Basic + C# USB driver as a cross-platform Rust driver (using rusb) to interact with hardware.",
      "Set up Auth0 authentication, RBAC, and a tRPC (full-stack type-safety) Node.js API to store electrical readings in MongoDB.",
    ],
  },
  {
    job_title: "Software Developer",
    company_name: "SolutionInc Ltd.",
    time_description: "2019, 2023",
    job_duties: [
      "Built customer and staff portal applications (using tech such as Angular.js, Express.js, Next.js, SQL) for a new ISP company to allow controlling and monitoring network + IPTV services + managing subscriptions with Chargebee. Designed and implemented high-availability Kubernetes cluster to host web applications across Proxmox cluster. Automated deployment w/ Helm & GitLab.",
      "Upgraded a legacy LAMPerl-stack network monitoring dashboard to use containers, Cypress E2E testing, GitLab C.I./C.D. Added a report editing feature to allow customers to customize their hotel/convention center network gateway usage reports.",
      "Returned in a software development position after working for a summer on the support & delivery team as a student, where I mostly worked on staging hardware with proprietary software for allowing secure in-room media casting in large hotel networks.",
    ],
  },
  {
    job_title: "Software Developer",
    company_name: "Praxes Medical Group Ltd.",
    time_description: "2021",
    job_duties: [
      "Maintained and updated their serverless COVID testing software for public rapid testing sites and B2B employer-led testing; facilitated the reporting of 300,000+ test results to patients, as well as aggregate statistic reports to stakeholders.",
      "Upgraded Firestore database to allow more performant result querying and storage of additional information about each test.",
      "Designed and implemented volunteer registration system w/ Firebase Cloud Functions, Firestore database, and Vue.js app.",
    ],
  },
  {
    job_title: "Software Developer & Service Desk Coordinator",
    company_name: "Race Auto Group Ltd.",
    time_description: "2017, 2018, 2020, 2022",
    job_duties: [
      "Rapidly designed and implemented a Next.js/React.js rental car booking system for the dealership to capitalize on a local rental car shortage w/ a dynamic price-calendar system by vehicle type and embedded Stripe payment processing.",
      "Managed the service desk by creating work orders, ordering parts, resolving customer issues, and allocating mechanic time. Was responsible for keeping the company Wordpress website and integrated inventory system up to date.",
    ],
  },
];

export function WorkExperienceSection(): ReactElement {
  return (
    <ResumeSection title="Relevant Work Experience">
      {WORK_EXPERIENCES.map((job, index) => (
        <div key={`${job.company_name}-${index}`}>
          <PastJobDescription key={`past-job-${index}`} {...job} />
          {index === WORK_EXPERIENCES.length - 1 ? null : (
            <WorkExperienceSeparator
              key={`work-experience-separator-${index}`}
            />
          )}
        </div>
      ))}
    </ResumeSection>
  );
}
