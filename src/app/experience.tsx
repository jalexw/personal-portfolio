import { WelcomeMessage } from "@/components/welcome-message";
import { email } from "@/metadata";
import Link from "next/link";
import type { ReactElement } from "react";

export function PortfolioExperienceContent(): ReactElement {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Link
          href={`mailto:${email}`}
          target="_blank"
          referrerPolicy="no-referrer"
          className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
        >
          {email}
        </Link>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <Link
            className="flex place-items-center gap-2 p-8 lg:p-0"
            href="/"
          >
            By{' '}
            J. Alex Whitman
          </Link>
        </div>
      </div>

      <WelcomeMessage message="Hey there! 👋"/>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        
      </div>
    </main>
  )
}
