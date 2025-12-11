"use client";

import { email } from "@/metadata";
import domain from "@/metadata/domain";
import geographic_location from "@/metadata/geographic_location";
import { githubUser } from "@/metadata/github";
import { linkedInUser } from "@/metadata/linkedin";
import { getFormattedPhoneNumber, getPhoneTelHref } from "@/metadata/phone";
import { Separator } from "@schemavaults/ui";
import {
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPinHouse,
  Phone,
} from "lucide-react";
import type { ReactElement } from "react";

export function ResumeHeader(): ReactElement {
  const PORTFOLIO_SITE_URL: string = `https://${domain()}`;
  return (
    <>
      <header className="w-full flex flex-row items-center justify-between">
        {/** Left-Side Links / Info */}
        <div className="">
          <a href={`mailto:${email}`} className="flex flex-row gap-2">
            <Mail className="p-1" />
            <span className="text-black">{email}</span>
          </a>
          <a href={getPhoneTelHref()} className="flex flex-row gap-2">
            <Phone className="p-1" />
            <span className="text-black">{getFormattedPhoneNumber()}</span>
          </a>
          <div className="flex flex-row gap-2">
            <MapPinHouse className="p-1" />
            <span className="text-black">{geographic_location}</span>
          </div>
        </div>

        {/** Title */}
        <div className="grow flex flex-col items-center justify-center">
          <h1 className="font-bold text-2xl">J. Alex Whitman{"'"}s Résumé</h1>
          <h2 className="text-xl">Full-Stack Software Developer</h2>
        </div>

        {/** Right-Side Links / Info */}
        <div>
          <a href={PORTFOLIO_SITE_URL} className="flex flex-row gap-2">
            <Globe className="p-1" />
            <span className="text-black">{PORTFOLIO_SITE_URL}</span>
          </a>
          <a
            href={`https://linkedin.com/in/${linkedInUser}`}
            className="flex flex-row gap-2"
          >
            <Linkedin className="text-white bg-blue-800 p-1" />
            <span className="text-black">{linkedInUser}</span>
          </a>
          <a
            href={`https://github.com/${githubUser}`}
            className="flex flex-row gap-2"
          >
            <Github className="p-1" />
            <span className="text-black">{githubUser}</span>
          </a>
        </div>
      </header>
      <Separator decorative={true} />
    </>
  );
}

export default ResumeHeader;
