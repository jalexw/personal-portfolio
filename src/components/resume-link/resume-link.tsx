"use client";

import type { FC, PropsWithChildren, ReactElement } from "react";

import { FileText } from "lucide-react";
import { default as NextLink } from "next/link";
import { Button } from "@schemavaults/ui";
import getResumeDocumentHref from "@/lib/getResumeDocumentHref";

interface ILinkProps extends PropsWithChildren {
  href: string;
  target: "_self" | "_blank";
}
type TLink = FC<ILinkProps>;

export function ResumeLink(): ReactElement {
  const Link: TLink =
    process.env.NODE_ENV === "development"
      ? (props: ILinkProps) => (
          <NextLink href={props.href} target={props.target}>
            {props.children}
          </NextLink>
        )
      : (props: ILinkProps) => (
          <a href={props.href} target={props.target}>
            {props.children}
          </a>
        );

  return (
    <Link
      href={getResumeDocumentHref()}
      target={process.env.NODE_ENV === "development" ? "_self" : "_blank"}
    >
      <Button className="flex flex-row justify-start gap-2" variant={"outline"}>
        <span className="block md:hidden">Resume: </span>
        <span className="hidden md:block">View my resume: </span>
        <FileText className="w-4 h-4" />
      </Button>
    </Link>
  );
}
