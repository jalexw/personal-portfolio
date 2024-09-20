"use client";

import type { PropsWithChildren, ReactElement } from "react";

export interface ResumePageContainerProps extends PropsWithChildren {}

export default function ResumePageContainer({
  children,
}: ResumePageContainerProps): ReactElement {
  return (
    <div
      className="
      grid place-items-center
      min-h-screen print:min-h-0
      bg-gray-400
      overflow-x-scroll print:overflow-x-hidden"
    >
      <div
        className="
        m-4 lg:m-12 print:m-0
        h-[297mm] w-[210mm] print:h-screen
        overflow-hidden
        rounded-md print:rounded-none
        bg-white
        text-black
        p-8 print:p-0
        shadow-lg print:shadow-none
      "
      >
        {children}
      </div>
    </div>
  );
}
