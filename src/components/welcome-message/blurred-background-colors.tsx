import type { ReactElement } from "react";
import { m } from "@schemavaults/ui";
import { duration } from "./exit-duration";

export function BlurredBackgroundColors(): ReactElement {
  return (
    <m.div
      id="blurred-background-colors"
      transition={{
        duration: duration,
        ease: "easeInOut",
      }}
      variants={{
        initial: {
          scale: 1,
          opacity: 1,
          rotate: 0,
          visibility: "visible",
          display: "block",
        },
        hidden: {
          scale: 0,
          opacity: 0,
          rotate: -20,
          transitionEnd: {
            visibility: "hidden",
            display: "none",
          },
        },
      }}
      initial={"visible"}
      animate={"visible"}
      exit={"hidden"}
      className="
        absolute flex
        antialiased m-auto
        top-[50vh]
        left-[10vw] lg:left-[30vw]
        place-items-center
        w-full
        z-40
      "
    >
      <m.div
        className="
          absolute flex place-items-center
          before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-['']
          after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-['']
          before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10
          after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40
          before:lg:h-[350px]
          z-40
        "
      />
      <m.div
        className="
          absolute flex place-items-center
          before:absolute before:h-[330px] before:w-[450px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-['']
          after:absolute after:-z-20 after:h-[210px] after:w-[270px] after:translate-x-2/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-['']
          before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10
          after:dark:from-sky-900 after:dark:via-[#b11cb6] after:dark:opacity-40
          before:lg:h-[350px]
          z-40
        "
      />
    </m.div>
  );
}
