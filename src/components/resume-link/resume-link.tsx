"use client";

import type { ReactElement } from "react";

import { FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@schemavaults/ui";
import getResumeDocumentHref from "@/lib/getResumeDocumentHref";

export function ResumeLink(): ReactElement {
  return (
    <Link
      href={getResumeDocumentHref()}
      target={process.env.NODE_ENV === "development" ? "_self" : "_blank"}
      prefetch={process.env.NODE_ENV === "development"}
    >
      <Button className="flex flex-row justify-start gap-2" variant={"outline"}>
        <span className="block md:hidden">Resume: </span>
        <span className="hidden md:block">View my resume: </span>
        <FileText className="w-4 h-4" />
      </Button>
    </Link>
  );
}
