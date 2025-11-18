"use client";

import {
  cn,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@schemavaults/ui";
import type { ReactElement } from "react";
import Link from "next/link";

interface BaseSocialMediaLinkProps {
  tooltip: string;
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

function SocialMediaLinkContent({
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
        )}
      >
        <button
          className={cn(
            containerSizeClassName,
            containerHoverAnimationClassName,
            "flex items-center justify-center",
          )}
          onClick={(e): void => {
            e.preventDefault();
            props.onClick();
          }}
        >
          <SocialMediaIcon className={iconSizeClassName} />
        </button>
      </li>
    );
  } else {
    throw new Error(
      "Invalid props for SocialMediaLink component! Missing a valid 'href' or 'onClick' prop!",
    );
  }
}

function SocialMediaLink(props: SocialMediaLinkProps): ReactElement {
  const tooltip: string = props.tooltip;
  return (
    <Tooltip>
      <TooltipTrigger>
        <SocialMediaLinkContent {...props} />
      </TooltipTrigger>
      <TooltipContent>
        <TooltipArrow />
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}

export default SocialMediaLink;
