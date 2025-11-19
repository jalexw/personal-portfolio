import type { ReactElement } from "react";
import ResumeSection from "./resume_section";
import Image from "next/image";
import { cn } from "@schemavaults/ui";

interface EducationOrCertificationTileProps {
  img_src: string;
  img_alt: string;
  certification_title: string;
  certification_issuer: string;
  certification_date: string;
  scale?: number;
}

function EducationTile(props: EducationOrCertificationTileProps) {
  const scale: number = props.scale ?? 1;
  return (
    <div
      className={cn(
        "flex flex-col justify-start items-center grow",
        "text-center",
        "bg-blue-50 print:bg-transparent",
        "p-1",
        "rounded-md border border-gray-400 border-dotted",
      )}
    >
      <Image
        width={48}
        height={48}
        src={props.img_src}
        alt={props.img_alt}
        className="mb-2"
        style={{ transform: `scale(${scale})` }}
      />
      <p className="text-xs font-bold text-wrap">{props.certification_title}</p>
      <p className="text-xs">{props.certification_issuer}</p>
      <p className="text-xs">{props.certification_date}</p>
    </div>
  );
}

export function EducationAndCertificationsSection(): ReactElement {
  return (
    <ResumeSection title="Education & Certifications">
      <div className="w-full flex flex-row justify-around items-start flex-nowrap gap-2">
        <EducationTile
          certification_title="Bachelor of Science"
          certification_issuer="Western University"
          certification_date="2022"
          img_alt="Western University logo"
          img_src="/images/education/western.png"
        />
        <EducationTile
          certification_title="International Baccalaureate Diploma"
          certification_issuer="Halifax Grammar School"
          certification_date="2018"
          img_alt="International Baccalaureate logo"
          img_src="/images/education/ib.png"
          scale={0.75}
        />
        <EducationTile
          certification_title="Professional Machine Learning Engineer"
          certification_issuer="Google Cloud Platform"
          certification_date="2023"
          img_alt="Google Cloud Platform logo"
          img_src="/images/education/gcp.png"
        />
        <EducationTile
          certification_title="Associate Cloud Engineer"
          certification_issuer="Google Cloud Platform"
          certification_date="2023"
          img_alt="Google Cloud Platform logo"
          img_src="/images/education/gcp.png"
        />
      </div>
    </ResumeSection>
  );
}
