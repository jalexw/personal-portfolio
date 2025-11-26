"use client";

import type { ReactElement } from "react";
import SocialMediaLink from "./SocialMediaLink";
import { cn } from "@schemavaults/ui";

// LinkedIn
import { linkedInLink } from "@/metadata/linkedin";
import LinkedInIcon from "./social_media_logos/linkedin.svg";

// X
import { xLink } from "@/metadata/twitter";
import XIcon from "./social_media_logos/x.svg";

// Facebook
import { facebookLink } from "@/metadata/facebook";
import FacebookIcon from "./social_media_logos/facebook.svg";

// Instagram
import { instagramLink } from "@/metadata/instagram";
import InstagramIcon from "./social_media_logos/instagram.svg";

// GitHub
import { githubLink } from "@/metadata/github";
import GithubIcon from "./social_media_logos/github.svg";

// Email/Contact
import { useOpenContactForm } from "@/components/ContactFormDialog";
import { Mail } from "lucide-react";

// GoodReads
import { goodreadsLink } from "@/metadata/goodreads";
import GoodreadsIcon from "./social_media_logos/goodreads.svg";

export function SocialMediaLinks(): ReactElement {
  const openContactForm = useOpenContactForm();
  return (
    <ul
      className={cn(
        "flex flex-wrap flex-row",
        "gap-2 md:gap-3 lg:gap-4 xl:gap-6",
        "justify-evenly items-center",
        "px-8 md:px-8 lg:px-12 xl:px-16",
      )}
    >
      <SocialMediaLink
        href={linkedInLink}
        SocialMediaIcon={({ className }) => (
          <LinkedInIcon className={className} />
        )}
        tooltip="LinkedIn"
      />
      <SocialMediaLink
        href={instagramLink}
        SocialMediaIcon={({ className }) => (
          <InstagramIcon className={className} />
        )}
        tooltip="Instagram"
      />
      <SocialMediaLink
        href={githubLink}
        SocialMediaIcon={({ className }) => (
          <GithubIcon className={className} />
        )}
        tooltip="Github"
      />
      <SocialMediaLink
        href={facebookLink}
        SocialMediaIcon={({ className }) => (
          <FacebookIcon className={className} />
        )}
        tooltip="Facebook"
      />
      <SocialMediaLink
        href={xLink}
        SocialMediaIcon={({ className }) => <XIcon className={className} />}
        tooltip="X/Twitter"
      />
      <SocialMediaLink
        href={goodreadsLink}
        SocialMediaIcon={({ className }) => (
          <GoodreadsIcon
            className={cn(className, "w-full h-full fill-white", "scale-75")}
          />
        )}
        tooltip="Goodreads"
      />
      <SocialMediaLink
        onClick={(): void => {
          openContactForm();
          return;
        }}
        SocialMediaIcon={({ className }) => <Mail className={className} />}
        tooltip="Email / Contact Form"
      />
    </ul>
  );
}

export default SocialMediaLinks;
