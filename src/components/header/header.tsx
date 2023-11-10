import Link from "next/link";
import { ReactElement } from "react";
import { ContactDialog } from "@/components/contact";
import { ThemeModeSelection } from "@/components/theme";

export function HeaderBar(): ReactElement {
  // return (
  //   <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
  //     <Link
  //       href={'/'}
  //       className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
  //     >
  //       {'J. Alex Whitman\'s Portfolio'}
  //     </Link>
  //     <div
  //       className="
  //         fixed
  //         bottom-0 left-0
  //         flex
  //         h-48
  //         w-full
  //         items-end justify-center
  //         bg-gradient-to-t
  //         from-white
  //         via-white
  //         dark:from-black
  //         dark:via-black
  //         lg:static
  //         lg:h-auto
  //         lg:w-auto
  //         lg:bg-none
  //       "
  //     >
  //       <ContactDialog />
  //     </div>
  //   </div>
  // )

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