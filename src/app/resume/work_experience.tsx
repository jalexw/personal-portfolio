import type { ReactElement } from "react";
import { ResumeSection } from "./resume_section";

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
          <span className="font-bold">{ props.company_name }</span>, {props.job_title}
        </h3>
        <p className="text-xs font-bold">{ props.time_description }</p>
      </header>
      <ul className="w-full flex flex-col gap-1 list-disc">
        {
          props.job_duties.map((duty, index) => (
            <li key={index} className="text-xs">{duty}</li>
          ))
        }
      </ul>
    </article>
  )
}

export function WorkExperienceSection(): ReactElement {
  return (
    <ResumeSection title="Work Experience">
      <PastJobDescription
        job_title="Software Developer"
        company_name="Aycoutay Technologies Ltd."
        time_description="2024"
        job_duties={[
          "Rewrote legacy Visual Basic hardware driver as a cross-platform memory-safe Rust library to interact with measurement device.",
          "Created cross-platform native Tauri app, which allowed taking electrophysiology measurements from Aycoutay's proprietary hardware devices, analyzing and visualizing the measurement data in real-time.",
          "Set up authentication, RBAC, and a type-safe tRPC API to allow secure access to data stored in MongoDB."
        ]}
      />
      <PastJobDescription
        job_title="Software Developer"
        company_name="SolutionInc Ltd."
        time_description="2019, 2023"
        job_duties={[
          "Built customer and staff portal applications for a new ISP company. Designed and implemented self-hosted high-availability Kubernetes cluster to host the web portals and services. Automated deployment to staging & production env's using Helm.",
          "Upgraded a legacy LAMPerl-stack network monitoring dashboard to use containers, automated testing, C.I./C.D., & more. Added a report editing feature to allow customers to customize their hotel/convention center network gateway usage reports.",
          "Returned in a software development position after working for a summer on the support & delivery team as a student, where I mostly worked on staging hardware with proprietary software for allowing secure in-room media casting in large hotel networks."
        ]}
      />
      <PastJobDescription
        job_title="Software Developer"
        company_name="Praxes Medical Group Ltd."
        time_description="2021"
        job_duties={[
          "Maintained and updated their serverless COVID testing software for public rapid testing sites and B2B employer-led testing; facilitated the reporting of 300,000+ test results to patients, as well as aggregate statistic reports to stakeholders.",
          "Upgraded Firestore database to allow more performant result querying and storage of additional information about each test.",
          "Designed and implemented a serverless backend, database, and Vue.js web app for volunteer registration and cancellation."
        ]}
      />
      <PastJobDescription
        job_title="Software Developer & Service Desk Coordinator"
        company_name="Race Auto Group Ltd."
        time_description="2017, 2018, 2020, 2022"
        job_duties={[
          "Rapidly designed and implemented a Next.js rental car booking system for the dealership to capitalize on a local rental car shortage. Later added a custom pricing calendar system, to allow dynamically setting rental rates by date range by vehicle type.",
          "Managed the service desk by creating work orders, ordering parts, resolving customer issues, and allocating mechanic time. Was responsible for keeping the company Wordpress website and integrated inventory system up to date."
        ]}
      />
    </ResumeSection>
  )
}