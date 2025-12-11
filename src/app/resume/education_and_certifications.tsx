"use client";

import type { ReactElement } from "react";
import ResumeSection from "./resume_section";
import Image from "next/image";
import { cn } from "@schemavaults/ui";

interface EducationOrCertificationTileProps {
  img_src: string;
  img_alt: string;
  certification_title: string;
  certification_subtitles?: readonly string[];
  certification_issuer: string;
  certification_date: string;
  img_scale?: number;
  priority?: boolean;
}

function EducationTile(props: EducationOrCertificationTileProps) {
  const img_scale: number = props.img_scale ?? 1.0;
  const borderColorClassname: string = cn("border-gray-400");
  return (
    <li
      className={cn(
        "flex flex-col justify-start items-center",
        "grow",
        props.priority ? "flex-shrink-0" : undefined,
        "text-center",
        "bg-blue-50",
        "rounded-md border border-dotted",
        borderColorClassname,
        "shadow-md",
        "relative",
      )}
    >
      {/** Issuing Institution Header */}
      <div
        className={cn(
          "w-full",
          "h-7",
          "flex-shrink-0",
          "flex flex-row",
          "items-center justify-center",
          "border-b border-dotted",
          borderColorClassname,
          "px-1 pt-1 pb-0.5",
          "gap-1",
        )}
      >
        <Image
          width={24}
          height={24}
          src={props.img_src}
          alt={props.img_alt}
          style={{ transform: `scale(${img_scale})` }}
        />
        <p
          className={cn(
            "text-xs",
            "font-bold",
            "z-50",
            "text-nowrap",
            "translate-y-0.5",
          )}
        >
          {props.certification_issuer}
        </p>
      </div>

      {/** Degree/Cert Details */}
      <div
        className={cn(
          "grow",
          "flex flex-col",
          "items-center justify-center",
          "p-1",
        )}
      >
        <p className="text-xs font-semibold text-balance">
          {props.certification_title}
        </p>
        {props.certification_subtitles &&
          Array.isArray(props.certification_subtitles) && (
            <ul className="list-disc list-inside text-left">
              {props.certification_subtitles.map((subtitle: string) => (
                <li key={subtitle} className={cn("text-[0.6rem] text-nowrap")}>
                  {subtitle}
                </li>
              ))}
            </ul>
          )}
      </div>

      {/** Certification Date */}
      <div
        className={cn(
          "-top-1.5 right-0 absolute",
          "bg-blue-200",
          "px-0.5",
          "rounded-md border-dotted border",
          borderColorClassname,
          "shadow-none",
        )}
      >
        <p className="text-[0.52rem]">{props.certification_date}</p>
      </div>
    </li>
  );
}

export function EducationAndCertificationsSection(): ReactElement {
  return (
    <ResumeSection title="Education & Certifications">
      <ul
        className={cn(
          "w-full",
          "flex flex-row",
          "justify-around items-stretch",
          "flex-nowrap gap-2",
          "bg-white",
        )}
      >
        <EducationTile
          certification_title="Bachelor of Science"
          certification_subtitles={[
            "Major in Computer Science",
            "Minor in Medical Science",
          ]}
          certification_issuer="Western University"
          certification_date="2022"
          img_alt="Western University logo"
          img_src="/images/education/western.png"
          img_scale={0.75}
          priority
        />
        <EducationTile
          certification_title="Professional Machine Learning Engineer"
          certification_issuer="Google Cloud"
          certification_date="2023"
          img_alt="Google Cloud Platform logo"
          img_src="/images/education/gcp.png"
          img_scale={0.9}
        />
        <EducationTile
          certification_title="Associate Cloud Engineer"
          certification_issuer="Google Cloud"
          certification_date="2023"
          img_alt="Google Cloud Platform logo"
          img_src="/images/education/gcp.png"
          img_scale={0.9}
        />
        <EducationTile
          certification_title="International Baccalaureate Diploma"
          certification_issuer="Halifax Grammar School"
          certification_date="2018"
          img_alt="International Baccalaureate logo"
          img_src="/images/education/ib.png"
          img_scale={0.75}
        />
      </ul>
    </ResumeSection>
  );
}
