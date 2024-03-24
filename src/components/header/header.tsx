import Link from "next/link";
import { ReactElement } from "react";
import { ContactDialog } from "@/components/contact";
import { ThemeModeSelection } from "@/components/theme";

export function HeaderBar(): ReactElement {
  return (
    <header
      className="flex flex-col lg:flex-row items-center justify-between m-4 gap-2 sm:gap-4 w-full max-w-5xl p-4 sm:p-8 md:p-12 lg:p-16"
    >
      {/** Title */}
      <Link href="/">
        <h1
          className="
            text-md sm:text-lg md:text-xl
            font-mono font-bold
            text-center lg:text-left
          ">
          {'J. Alex Whitman\'s Portfolio'}
        </h1>
      </Link>

      {/** Buttons */}
      <div
        className="
          flex
          flex-row
          flex-wrap
          gap-1 sm:gap-2 md:gap-4
          justify-start
          items-center
        "
      >
        <ContactDialog />
        <ThemeModeSelection />
      </div>
    </header>
  )
}