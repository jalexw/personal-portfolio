"use client";

import { githubLink } from "@/metadata/github";
import { instagramLink } from "@/metadata/instagram";
import { linkedInLink } from "@/metadata/linkedin";
import { cn } from "@schemavaults/ui";
import { Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import { type ReactElement } from "react";

interface BaseSocialMediaLinkProps {
  SocialMediaIcon: ({ className }: { className?: string }) => ReactElement;
}

interface HrefSocialMediaLinkProps extends BaseSocialMediaLinkProps {
  href: string;
}

interface ClickActionSocialMediaLinkProps extends BaseSocialMediaLinkProps {
  onClick: () => void;
}

export type SocialMediaLinkProps =
  | HrefSocialMediaLinkProps
  | ClickActionSocialMediaLinkProps;

function SocialMediaLink({
  SocialMediaIcon,
  ...props
}: SocialMediaLinkProps): ReactElement {
  const containerSizeClassName: string = "h-20 w-20";
  const containerBorderClassName: string = "rounded-md";
  const iconSizeClassName: string = "h-14 w-14";
  const containerHoverAnimationClassName =
    "hover:bg-muted transition-colors duration-200 ease-in-out hover:cursor-pointer";

  if ("href" in props && typeof props.href === "string") {
    return (
      <li
        className={cn(
          containerSizeClassName,
          containerHoverAnimationClassName,
          containerBorderClassName,
        )}
      >
        <Link
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            containerSizeClassName,
            "flex items-center justify-center",
          )}
        >
          <SocialMediaIcon className={iconSizeClassName} />
        </Link>
      </li>
    );
  } else if ("onClick" in props && typeof props.onClick === "function") {
    return (
      <li
        className={cn(
          containerSizeClassName,
          containerHoverAnimationClassName,
          containerBorderClassName,
          "flex items-center justify-center",
        )}
        onClick={(e): void => {
          e.preventDefault();
          props.onClick();
        }}
      >
        <SocialMediaIcon className={iconSizeClassName} />
      </li>
    );
  } else {
    throw new Error(
      "Invalid props for SocialMediaLink component! Missing a valid 'href' or 'onClick' prop!",
    );
  }
}

export function SocialMediaLinks(): ReactElement {
  return (
    <ul className="flex flex-wrap gap-2 md:gap-3 lg:gap-4 xl:gap-6 flex-row justify-evenly items-center">
      <SocialMediaLink
        href={linkedInLink}
        SocialMediaIcon={({ className }) => <Linkedin className={className} />}
      />
      <SocialMediaLink
        href={instagramLink}
        SocialMediaIcon={({ className }) => <Instagram className={className} />}
      />
      <SocialMediaLink
        href={githubLink}
        SocialMediaIcon={({ className }) => <Github className={className} />}
      />
    </ul>
  );
}

export default SocialMediaLinks;
