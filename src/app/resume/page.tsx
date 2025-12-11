// resume/page.tsx - Resume written with React components

// React/Next Imports
import type { ReactElement } from "react";
import type { Metadata } from "next";
import { openingStatement } from "./opening_statement";
import { redirect } from "next/navigation";
import { getProductionResumeDocumentHref } from "@/lib/getResumeDocumentHref";
import ResumePageView from "./resume_page_view";

export default async function ResumePage(): Promise<ReactElement> {
  if (process.env.NODE_ENV === "development") {
    return <ResumePageView />;
  }
  redirect(getProductionResumeDocumentHref());
}

export const metadata: Metadata = {
  title: "J. Alex Whitman's Resume",
  description: openingStatement,
};
