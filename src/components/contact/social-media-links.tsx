import { Github, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';
import type { ReactElement } from 'react';

interface SocialMediaLinkProps {
  href: string;
  SocialMediaIcon: ({ className }: { className?: string }) => ReactElement;
}

function SocialMediaLink({ href, SocialMediaIcon }: SocialMediaLinkProps): ReactElement {
  return (
    <Link
      href={href}
      target="_blank" rel="noopener noreferrer"
      className='hover:bg-muted transition-colors duration-200 ease-in-out p-2 lg:p-4 rounded-md'
    >
      <SocialMediaIcon className="h-12 w-12" />
    </Link>
  )
}

export function SocialMediaLinks(): ReactElement {
  return (
    <div className="flex flex-wrap gap-2 md:gap-3 lg:gap-4 flex-row justify-evenly items-center">
      <SocialMediaLink
        href="https://www.linkedin.com/in/jalexwhitman/"
        SocialMediaIcon={(({className}) => <Linkedin className={className} /> )}
      />
      <SocialMediaLink
        href="https://www.instagram.com/jalexwhitman/"
        SocialMediaIcon={(({className}) => <Instagram className={className} /> )}
      />
      <SocialMediaLink
        href="https://www.github.com/jalexw/"
        SocialMediaIcon={(({className}) => <Github className={className} /> )}
      />
    </div>
  );
};
