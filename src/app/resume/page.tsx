import type { ReactElement } from "react";
import { ResumeHeader } from "./resume_header";

export default function Resume(): ReactElement {
  return (
    <div className="
      grid place-items-center
      min-h-screen print:min-h-0
      bg-gray-400"
    >
      <main className="
        m-4 lg:m-12 print:m-0
        h-[297mm] w-[210mm] print:h-screen
        overflow-hidden
        rounded-md print:rounded-none
        bg-white
        p-8
        shadow-lg print:shadow-none
        flex flex-col justify-start items-center gap-2
      ">
        <ResumeHeader />
        <p>Coming soon!</p>
      </main>
    </div>
  )
}
